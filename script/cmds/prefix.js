module.exports.config = {
  name: "prefix",
  role: 0,
  description: "See system prefix",
  usage: "prefix",
  credits: "ArYAN",
  cooldown: 0,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args, prefix }) {
  try {
    const myPrefix = `
🤖 𝗢𝗿𝗼𝗰𝗵𝗶 𝖠𝗎𝗍𝗼𝖻𝗈𝗍
━━━━━━━━━━━━

🌟 𝗛𝗲𝗹𝗹𝗼! 𝗠𝘆 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝘀 [ ${prefix} ]

🔧 𝖥𝖾𝖺𝗍𝗎𝗋𝖾𝗌:
1. 𝗘𝗮𝘀𝘆 𝗨𝘀𝗲: 𝖲𝗂𝗆𝗉𝗅𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌 𝗍𝗈 𝗆𝖺𝗄𝖾 𝗒𝗈𝗎𝗋 𝗅𝗂𝖿𝖾 𝖾𝖺𝗌𝗒.
2. 𝗨𝗻𝗶𝗰𝗼𝗱𝗲 𝗦𝘁𝘆𝗹𝗶𝗻𝗴: 𝖲𝗍𝗒𝗅𝗂𝗌𝗁 𝖺𝗇𝖽 𝗎𝗇𝗂𝗊𝗎𝖾 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖿𝗈𝗋𝗆𝖺𝗍𝗌.
3. 𝗕𝗲𝘁𝘁𝗲𝗿 𝗦𝘆𝘀𝘁𝗲𝗺: 𝖤𝖿𝖿𝗂𝖼𝗂𝖾𝗇𝗍 𝖺𝗇𝖽 𝗌𝖺𝖿𝖾, 𝗐𝗂𝗍𝗁𝗈𝗎𝗍 𝗋𝗂𝗌𝗄 𝗈𝖿 𝖺𝖼𝗈𝗎𝗇𝗍 𝗌𝗎𝗌𝗉𝖾𝗇𝗌𝗂𝗈𝗇.
4. 𝗦𝗲𝗰𝘂𝗿𝗲: 𝖲𝗍𝗋𝗈𝗇𝗀 𝗉𝗋𝗈𝗍𝖾𝗍𝗂𝗈𝗇 𝖺𝗀𝖺𝗂𝗇𝗌𝗍 𝗎𝗇𝖺𝗎𝗍𝗁𝗈𝗋𝗂𝗓𝖾𝖽 𝖺𝖼𝗍𝗂𝗏𝗂𝗍𝗒.
5. 𝗔𝗱𝘃𝗮𝗻𝗰𝗲𝗱 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀: 𝖳𝗈𝗈𝗅𝗌 𝗍𝗈 𝗆𝖺𝗑𝗂𝗆𝗂𝗓𝖾 𝗒𝗈𝗎𝗋 𝖻𝗈𝗍'𝗌 𝗉𝗈𝗍𝖾𝗇𝗍𝗂𝖺𝗅.

🛡️ 𝗕𝗼𝘁 𝗣𝗿𝗼𝘁𝗲𝗰𝘁𝗶𝗼𝗻:
𝗆𝖺𝗑𝗂𝗆𝗎𝗆 𝗌𝖾𝖼𝗎𝗋𝗂𝗍𝗒 𝖺𝗀𝖺𝗂𝗇𝗌𝗍 𝗎𝗇𝖺𝗎𝗍𝗁𝗈𝗋𝗂𝗓𝖾𝖽 𝖺𝖼𝗍𝗂𝗏𝗂𝗍𝗒.

🚀 𝗚𝗲𝘁 𝗦𝘁𝗮𝗿𝘁𝗲𝗱:
1. 𝗧𝘆𝗽𝗲: \`${prefix} help\` 𝖿𝗈𝗋 𝖺 𝗅𝗂𝗌𝗍 𝗈𝖿 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌.

━━━━━━━━━━━━`;
    api.sendMessage({ body: myPrefix }, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error sending prefix message:", error);
    api.sendMessage(
      "Unable to send prefix message.",
      event.threadID,
      event.messageID
    );
  }
};
