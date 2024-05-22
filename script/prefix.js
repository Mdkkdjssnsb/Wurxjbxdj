module.exports.config = {
  name: "prefix",
  role: 0,
  description: "See system prefix",
  usage: "prefix",
  credits: "ArYAN",
  cooldown: 0,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const myPrefix = "🤖 𝗢𝗿𝗼𝗰𝗵𝗶 𝖠𝗎𝗍𝗈𝖻𝗈𝗍\n━━━━━━━━━━━━\n\n𝗛𝗲𝗹𝗹𝗼! 𝗠𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝘀 [ ${prefix} ]\n\n𝖮𝗋𝗈𝖼𝗁𝗂 𝖠𝗎𝗍𝗈𝖡𝗈𝗍 𝖱𝖾𝗏𝗈𝗅𝗎𝗍𝗂𝗈𝗇𝗂𝗦𝖾𝖽 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗌𝗒𝗌𝗍𝖾𝗆, 𝖺𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖾𝖺𝗌𝗒-𝗍𝗈-𝗎𝗌𝖾 𝖺𝗇𝖽 𝖾𝖺𝗌𝗒-𝘁𝗈-𝗋𝖾𝗎𝗌𝖾 𝗌𝗍𝗒𝗅𝖾𝗌𝗁𝖾𝖾𝗍𝗌 𝗍𝗁𝖺𝗍 𝖺𝖽𝖽𝗌 𝗎𝗇𝗂𝖼𝗈𝖽𝖾 𝗌𝗍𝗒𝖾𝗅𝖾 𝗍𝗈 𝗒𝗈𝗎𝗋 𝖻𝗈𝗍 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝖾𝖺𝗌𝖾, 𝗐𝗂𝗍𝗁 𝖺 𝖻𝖾𝗍𝗍𝖾𝗋 𝗁𝖺𝗇𝖽𝗅𝗂𝗇𝗀 𝗌𝗒𝗌𝗍𝖾𝗆, 𝖺𝗏𝗈𝗂𝖽𝗂𝗇𝗀 𝗍𝗁𝖾 𝗋𝗂𝗌𝗄 𝗈𝖿 𝖺𝖼𝖼𝗈𝗎𝗇𝗍 𝗌𝗎𝗌𝗉𝖾𝗇𝗌𝗂𝗈𝗇!\n\n👑 𝗗𝗲𝘃: Ar𝖸𝖠𝖭";
    api.sendMessage({ body: myPrefix }, event.threadID);
  } catch (error) {
    console.error("Error sending prefix message:", error);
    api.sendMessage(
      "Unable to send prefix message.",
      event.threadID,
      event.messageID
    );
  }
};
