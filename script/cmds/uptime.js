const os = require("os");

const startTime = new Date(); // Moved outside onStart

module.exports.config = {
  name: "uptime",
  role: 0,
  description: "see server system",
  usage: "uptime",
  credits: "ArYAN",
  cooldown: 0,
  aliases: ["up", "upt"],
  hasPrefix: true,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const uptimeInSeconds = (new Date() - startTime) / 1000;

    const days = Math.floor(uptimeInSeconds / (3600 * 24));
    const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const secondsLeft = Math.floor(uptimeInSeconds % 60);
    const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${secondsLeft}s`;

    const cpuUsage =
      os
        .cpus()
        .map((cpu) => cpu.times.user)
        .reduce((acc, curr) => acc + curr) / os.cpus().length;

    const totalMemoryGB = os.totalmem() / 1024 ** 3;
    const freeMemoryGB = os.freemem() / 1024 ** 3;
    const usedMemoryGB = totalMemoryGB - freeMemoryGB;

    const currentDate = new Date();
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = currentDate.toLocaleDateString("en-US", options);
    const time = currentDate.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });

    const timeStart = Date.now();
    await api.sendMessage(
      {
        body: "🔎| checking........",
      },
      event.threadID
    );
    const ping = Date.now() - timeStart;

    let pingStatus = "⛔| 𝖡𝖺𝖽 𝖲𝗒𝗌𝗍𝖾𝗆";
    if (ping < 600) {
      pingStatus = "✅| 𝖲𝗆𝗈𝗈𝗍𝗁 𝖲𝗒𝗌𝗍𝖾𝗆";
    }

    const systemInfo = `♡   ∩_∩
 （„• ֊ •„)♡
╭─∪∪────────────⟡
│ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗜𝗡𝗙𝗢
├───────────────⟡
│ 🤖 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 
│ 𝙽𝙰𝙼𝙴: 𝖮𝗋𝗈𝖼𝗁𝗂 𝖠𝗎𝗍𝗈𝖡𝗈𝗍
│ 𝙻𝙰𝙽𝙶: 𝙽𝚘𝚍𝚎𝚓𝚜
│ 𝙿𝚁𝙵𝙸𝚇: ${module.exports.config.hasPrefix ? args[0] || "." : ""}
│ 𝙳𝙴𝚅𝚂: 𝙰𝚛𝗒𝖺𝗇
├───────────────⟡
│ ⏰ 𝗥𝗨𝗡𝗧𝗜𝗠𝗘
│  ${uptimeFormatted}
├───────────────⟡
│ 👑 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢
│𝙾𝚂: ${os.type()} ${os.arch()}
│𝙻𝙰𝙽𝙶 𝚅𝙴𝚁: ${process.version}
│𝙲𝙿𝚄 𝙼𝙾𝙳𝙴𝙻: ${os.cpus()[0].model}
│𝚂𝚃𝙾𝚁𝙰𝙶𝙴: ${usedMemoryGB.toFixed(2)} GB / ${totalMemoryGB.toFixed(2)} GB
│𝙲𝙿𝚄 𝚄𝚂𝙰𝙶𝙴: ${cpuUsage.toFixed(1)}%
│𝚁𝙰𝙼 𝚄𝚂𝙶𝙴: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
├───────────────⟡
│ ✅ 𝗢𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢
│𝙳𝙰𝚃𝙴: ${date}
│𝚃𝙸𝙼𝙴: ${time}
│𝙿𝙸𝙽𝙶: ${ping}ms
│𝚂𝚃𝙰𝚃𝚄𝚂: ${pingStatus}
╰───────────────⟡
`;

    api.sendMessage(
      {
        body: systemInfo,
      },
      event.threadID,
      (err, messageInfo) => {
        if (err) {
          console.error("Error sending message with attachment:", err);
        } else {
          console.log("Message with attachment sent successfully:", messageInfo);
        }
      }
    );
  } catch (error) {
    console.error("Error retrieving system information:", error);
    api.sendMessage(
      "Unable to retrieve system information.",
      event.threadID,
      event.messageID
    );
  }
};
