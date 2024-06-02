const axios = require('axios');
const tinyurl = require('tinyurl');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "4k",
  version: "1.0.0",
  role: 0,
  aliases: ["remini"],
  credits: "ARYAN",
  description: "Enhance image using Remini API",
  commandCategory: "tools",
  usages: "[reply to a photo]",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  let imageUrl;

  if (event.type === "message_reply") {
    const replyAttachment = event.messageReply.attachments[0];

    if (["photo", "sticker"].includes(replyAttachment?.type)) {
      imageUrl = replyAttachment.url;
    } else {
      return api.sendMessage(
        { body: "❌ | Reply must be an image." },
        event.threadID
      );
    }
  } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
    imageUrl = args[0];
  } else {
    return api.sendMessage(
      { body: "❌ | Reply to an image." },
      event.threadID
    );
  }

  try {
    const url = await tinyurl.shorten(imageUrl);
    const response = await axios.get(`https://aryanapiz.onrender.com/api/4k?url=${url}`);

    api.sendMessage("Processing your request, please wait.......", event.threadID);

    const resultUrl = response.data.resultUrl;
    const imageData = await axios.get(resultUrl, { responseType: 'stream' });

    const tempFilePath = path.join(__dirname, 'temp_image.jpg');
    const writer = fs.createWriteStream(tempFilePath);

    imageData.data.pipe(writer);

    writer.on('finish', () => {
      const attachment = fs.createReadStream(tempFilePath);
      api.sendMessage(
        {
          body: "🖼️ 𝟰𝗞 𝗜𝗠𝗔𝗚𝗘\n━━━━━━━━━━━━━━━\n\n𝖧𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝗎𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝗂𝗆𝖺𝗀𝖾.",
          attachment: attachment
        },
        event.threadID,
        () => fs.unlinkSync(tempFilePath) // Clean up temp file after sending
      );
    });

    writer.on('error', (error) => {
      fs.unlink(tempFilePath, () => {}); // Ensure temp file is deleted if an error occurs
      api.sendMessage("❌ | Error writing image file: " + error.message, event.threadID);
    });

  } catch (error) {
    api.sendMessage("❌ | Error: " + error.message, event.threadID);
  }
};
