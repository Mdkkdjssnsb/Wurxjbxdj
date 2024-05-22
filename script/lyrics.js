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
  const fs = require("fs");
  const axios = require("axios");
  const t = args.join(" ");

  if (!t) return api.sendMessage("⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲\n━━━━━━━━━━\n\nPlease provide a song name!", event.threadID, event.messageID);

  try {
    const r = await axios.get('https://himachalwale.onrender.com/api/lyrics?songName=${encodeURIComponent(t)}&apikey=©himachalwale');
    const { image, lyrics, artist, title } = r.data;

    let ly = __dirname + "/../public/image/lyrics.png";
    let suc = (await axios.get(image, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(ly, Buffer.from(suc, "utf-8"));
    let img = fs.createReadStream(ly);

    api.setMessageReaction("✅", event.messageID, (err) => {}, true);

    return api.sendMessage({
      body: `ℹ 𝗟𝘆𝗿𝗶𝗰𝘀 𝗧𝗶𝘁𝗹𝗲\n➤ ${title}\n👑 𝗔𝗿𝘁𝗶𝘀𝘁\n➤ ${artist}\n\n✅ 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗬𝗢𝗨𝗥 𝗟𝗬𝗥𝗜𝗖𝗦\n━━━━━━━━━━━━━━━\n${lyrics}\n\n━━━━━━𝗘𝗡𝗗━━━━━━━`,
      attachment: img
    }, event.threadID, () => fs.unlinkSync(ly), event.messageID);
  } catch (a) {
    api.setMessageReaction("⛔", event.messageID, (err) => {}, true);

    return api.sendMessage(a.message, event.threadID, event.messageID);
  }
}
