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
2. 𝗝𝗼𝗶𝗻: 𝖮𝗎𝗋 𝗌𝗎𝗉𝗉𝗈𝗋𝗍 𝗆𝖾𝗌𝗌𝖺𝗀𝖾𝗋 𝗀𝗋𝗈𝗎𝗉 𝗋𝗂𝗀𝗁𝗍 𝗁𝖾𝗋𝖾: [ https://m.me/j/AbaNsLua7Pl1Ywx6/ ]
3. 𝗝𝗼𝗶𝗻: 𝖮𝗎𝗋 𝗌𝗎𝗉𝗉𝗈𝗋𝗍 𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝗀𝗋𝗈𝗎𝗉 𝗋𝗂𝗀𝗁𝗍 𝗁𝖾𝗋𝖾: [ https://www.facebook.com/share/aq6Qfb7wyr4g8C1B/?mibextid=A7sQZp ]
4. 𝗔𝘂𝘁𝗼𝗕𝗼𝘁: 𝖧𝖾𝗋𝖾 𝗂𝗌 𝗅𝗂𝗇𝗄 𝗈𝖿 𝗈𝗎𝗋 𝖺𝗎𝗍𝗈𝖻𝗈𝗍: [ https://orochi-community.onrender.com ]
5. 𝗙𝗲𝗲𝗱𝗯𝗮𝗰𝗸: 𝖦𝗂𝗏𝖾 𝗎𝗌 𝗒𝗈𝗎𝗋 𝗏𝖺𝗅𝗎𝖺𝖻𝗅𝖾 𝖿𝖾𝖾𝖽𝖻𝖺𝖼𝗄 𝗍𝗈 𝗂𝗆𝗉𝗋𝗈𝗏𝖾.

🎉 𝗪𝗵𝘆 𝗢𝗿𝗼𝗰𝗵𝗶 𝗔𝘂𝘁𝗼𝗯𝗼𝘁?
- 𝗨𝗻𝗶𝗾𝘂𝗲 𝗗𝗲𝘀𝗶𝗴𝗻: 𝖲𝗍𝗋𝗂𝗄𝗂𝗇𝗀 𝗎𝗌𝖾𝗋 𝗂𝗇𝗍𝖾𝗋𝖿𝖺𝖼𝖾 𝖽𝖾𝗌𝗂𝗀𝗇.
- 𝗛𝗶𝗴𝗵 𝗣𝗲𝗿𝗳𝗼𝗿𝗺𝗮𝗻𝗰𝗲: 𝖲𝗆𝗈𝗈𝗍𝗁 𝖺𝗇𝖽 𝖿𝖺𝗌𝗍 𝗋𝖾𝗌𝗉𝗈𝗇𝗌𝖾𝗌.
- 𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆-𝗗𝗿𝗶𝘃𝗲𝗻: 𝖡𝗎𝗂𝗅𝗍 𝗐𝗂𝗍𝗁 𝗂𝗇𝗉𝗎𝗍 𝖿𝗋𝗈𝗆 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍𝗌.

👑 𝗗𝗲𝘃: 𝖮𝗋𝗈𝖼𝗁𝗂 𝖳𝖾𝖺𝗆

━━━━━━━━━━━━

𝗦𝘁𝗮𝘆 𝗮𝘄𝗲𝘀𝗼𝗺𝗲 𝗮𝗻𝗱 𝗸𝗲𝗲𝗽 𝗰𝗵𝗮𝘁𝘁𝗶𝗻𝗴! 😎`;
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
