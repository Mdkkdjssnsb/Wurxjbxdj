module.exports.config = {
    name: 'sim',
    version: '1.0.0',
    role: 0,
    description: "Engage in conversation with an AI bot",
    usage: "sim [prompt]",
    credits: 'Developer',
    cooldown: 3,
	  hasPrefix: true,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const input = args.join(" ");

    if (!input) {
        api.sendMessage("🥱 Please provide a text prompt. Usage: sim [text]", event.threadID, event.messageID);
        return;
    }
    try {  
        const response = await axios.get(`https://itsaryanapis.onrender.com/api/sim?chat=${input}&lang=en`);
        const responseData = response.data.answer;
        if (responseData.error) {
            api.sendMessage("An error occurred. Please try again later.", event.threadID, event.messageID);
        } else {
            api.sendMessage(responseData.success, event.threadID, event.messageID);
        }
    } catch (error) {
        api.sendMessage("An error occurred while fetching the data.", event.threadID, event.messageID);
    }
};
