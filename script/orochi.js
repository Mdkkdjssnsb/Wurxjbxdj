const fonts = {
  a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁",
  i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", 
  p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", 
  w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓"
};

const axios = require('axios');

module.exports.config = {
  name: "orochi",
  version: 1.0,
  credits: "ArYAN | Orochi",
  description: "AI",
  hasPrefix: true,
  usages: "{pn} [prompt]",
  aliases: ["chi", ".chi"],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("🤖 𝗢𝗿𝗼𝗰𝗁𝗶\n━━━━━━━━━━━━━━\n\nHello! How can I assist you today ?", event.threadID, event.messageID);
      return;
    }
    const response = await axios.get(`https://himachalwale.onrender.com/ask/orochi?prompt=${encodeURIComponent(prompt)}&apikey=©himachalwale`);
    const answer = response.data.answer;

    let formattedAnswer = "";
    for (let char of answer) {
      if (fonts[char.toLowerCase()]) {
        formattedAnswer += fonts[char.toLowerCase()];
      } else {
        formattedAnswer += char;
      }
    }

    await api.sendMessage(`🤖 𝗢𝗿𝗼𝗰𝗁𝗂\n━━━━━━━━━━━━━\n\n${formattedAnswer}`, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
