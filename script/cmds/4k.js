const a = require('axios');
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
  usages: "[ reply a photo ]",
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
      const response = await a.get(`https://aryan-apis.onrender.com/api/4k?url=${url}`);

      api.sendMessage("Processing your request, please wait.......", event.threadID);

      const resultUrl = response.data.resultUrl;
      const imageData = await a.get(resultUrl, { responseType: 'stream' });

      api.sendMessage(
        {
          body: "🖼️ 𝟰𝗞 𝗜𝗠𝗔𝗚𝗘\n━━━━━━━━━━━━━━━\n\n𝖧𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝗎𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝗂𝗆𝖺𝗀𝖾𝗌.",
          attachment: imageData.data
        },
        event.threadID
      );

    } catch (error) {
      api.sendMessage("❌ | Error: " + error.message, event.threadID);
    }
  }
};
