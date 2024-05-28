const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports.config = {
    name: "emi",
    version: "1.0.0",
    role: 0,
    credits: "ArYAN",
    description: "Generate anime images based on emi style",
    hasPrefix: true,
    commandCategory: "Search",
    usages: "[Text]",
    cooldowns: 0,
};

module.exports.run = async function({ message, args, event }) {
    const text = args.join(" ");
    if (!text) {
        return message.reply("Please provide a prompt.");
    }

    let prompt = text;

    try {
        message.reply("Generating your imagination, please wait...").then((info) => { id = info.messageID });

        const API = `https://himachalwale.onrender.com/api/emi?prompt=${encodeURIComponent(prompt)}&apikey=©himachalwale`;

        // Fetch the image data from the API
        const response = await axios.get(API, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Create a temporary file path
        const tempImagePath = path.join(__dirname, 'tempImage.jpg');
        fs.writeFileSync(tempImagePath, imageBuffer);

        // Send the image as an attachment
        await message.reply({
            body: `🖼️`,
            attachment: fs.createReadStream(tempImagePath)
        });

        // Clean up the temporary file
        fs.unlinkSync(tempImagePath);
    } catch (error) {
        console.error(error);
        message.reply("Failed to generate your imagination.");
    }
};
