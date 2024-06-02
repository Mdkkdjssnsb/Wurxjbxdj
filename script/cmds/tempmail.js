const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "tempmail",
  role: 0,
  description: "Generate a temporary email or check inbox",
  usage: "[gen/inbox {email}]",
  credits: "ArYAN",
  cooldown: 0,
  aliases: ["tm"],
  hasPrefix: true
};

module.exports.run = async function({ api, event, args }) {
  try {
    if (args.length === 0) {
      return api.sendMessage("❌ | Use 'tempmail gen' to generate email and 'tempmail inbox {email}' to get the inbox emails.", event.threadID, event.messageID);
    }

    if (args[0].toLowerCase() === "gen") {
      try {
        const response = await axios.get("https://itsaryanapis.onrender.com/api/tempmail/get");
        const responseData = response.data.tempmail;
        api.sendMessage(`📮|𝗧𝗲𝗺𝗽𝗺𝗮𝗶𝗹\n━━━━━━━━━━━━━\n\n𝖧𝖾𝗋𝖾 𝗂𝗌 𝗒𝗈𝗎𝗋 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝖾𝖽 𝗍𝖾𝗆𝗉𝗆𝖺𝗂𝗅\n\n📍|𝗘𝗺𝗮𝗶𝗹\n➤ ${responseData}`, event.threadID, event.messageID);
      } catch (error) {
        console.error("❌ | Error", error);
        api.sendMessage("❌|Unable to generate email address. Please try again later...", event.threadID, event.messageID);
      }
    } else if (args[0].toLowerCase() === "inbox" && args.length === 2) {
      const email = args[1];
      try {
        const response = await axios.get(`https://itsaryanapis.onrender.com/api/tempmail/inbox?email=${encodeURIComponent(email)}`);
        const data = response.data;
        if (data.length === 0) {
          api.sendMessage("❌| No messages found in the inbox. Please check back later.", event.threadID, event.messageID);
        } else {
          const inboxMessages = data.map(({ from, subject, body, date }) => 
            `📍|𝗧𝗲𝗺𝗺𝗮𝗶𝗹 𝗜𝗻𝗯𝗼𝘅\n━━━━━━━━━━━━━━━\n\n🔎 𝗙𝗿𝗼𝗺\n➤ ${from}\n📭 𝗦𝘂𝗯𝗷𝗲𝗰𝘁\n➤ ${subject || 'Not Found'}\n\n📝 𝗠𝗲𝘀𝘀𝗮𝗴𝗲\n➤ ${body}\n🗓 𝗗𝗮𝘁𝗲\n➤ ${date}`
          ).join('\n\n');
          api.sendMessage(inboxMessages, event.threadID, event.messageID);
        }
      } catch (error) {
        console.error("🔴 Error", error);
        api.sendMessage("❌| Can't get any mail yet. Please send mail first.", event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("❌ | Use 'tempmail gen' to generate email and 'tempmail inbox {email}' to get the inbox emails.", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    return api.sendMessage("An error occurred. Please try again later.", event.threadID, event.messageID);
  }
};
