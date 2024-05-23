const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "lyrics",
  role: 0, 
  description: "Search Lyrics",
  usage: "[title of song]",
  credits: "ArYAN",
  cooldown: 0,
  hasPrefix: true
}

module.exports.run = async function({ api, event, args }) {
    try {
      const songName = args.join(" ");
      if (!songName) {
        api.sendMessage("⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲\n━━━━━━━━━━\n\nPlease provide a song name!", event.threadID, event.messageID);
        return;
      }

      const apiUrl = `https://himachalwale.onrender.com/api/lyrics?songName=${encodeURIComponent(songName)}&apikey=©himachalwale`;
  
      const response = await axios.get(apiUrl);
      const { lyrics, title, artist, image } = response.data;

      if (!lyrics) {
        api.sendMessage(`⛔ 𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱\n━━━━━━━━━━\n\nSorry, lyrics for "${songName}" not found, please provide another song name!`, event.threadID, event.messageID);
        return;
      }

      let message = `ℹ 𝗟𝘆𝗿𝗶𝗰𝘀 𝗧𝗶𝘁𝗹𝗲\n➤ ${title}\n👑 𝗔𝗿𝘁𝗶𝘀𝘁\n➤ ${artist}\n\n✅ 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗬𝗢𝗨𝗥 𝗟𝗬𝗥𝗜𝗖𝗦\n━━━━━━━━━━━━━━━\n${lyrics}\n\n━━━━━━𝗘𝗡𝗗━━━━━━━`;

      if (image) {
        let attachment = await fs.getStreamFromURL(image);
        api.sendMessage({ body: message, attachment }, event.threadID, (err, info) => {
          if (err) {
            console.error(err);
          }
        });
      } else {
        api.sendMessage(message, event.threadID, event.messageID);
      }

    } catch (error) {
      console.error(error);
      api.sendMessage(`⛔ 𝗘𝗿𝗿𝗼𝗿\n━━━━━━━━━━\n\nAn error occurred while fetching lyrics, please try again later.`, event.threadID, event.messageID);
    }
};
