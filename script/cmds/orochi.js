const fonts = {
  a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁",
  i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", 
  p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", 
  w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓"
};

const axios = require('axios');

module.exports.config = {
  name: "Orochi",
  version: 1.0,
  credits: "ArYAN | Orochi",
  description: "Ask an questios to Orochi Ai",
  hasPrefix: true,
  usages: "{pn} [prompt]",
  aliases: ["chi"],
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await api.sendMessage("🤖 𝗢𝗿𝗼𝗰𝗵𝗶\n━━━━━━━━━━━━━━\n\n𝖧𝖾𝗅𝗅𝗈! 𝖧𝗈𝗐 𝖼𝖺𝗇 𝗂 𝖺𝗌𝗌𝗂𝗌𝗍 𝗒𝗈𝗎 𝗍𝗈𝖽𝖺𝗒 ?", event.threadID, event.messageID);
      return;
    }
    const response = await axios.get(`https://itsaryanapis.onrender.com/api/orochiai?prompt=${encodeURIComponent(prompt)}`);
    const answer = response.data.fullResponse;

    let formattedAnswer = "";
    for (let char of answer) {
      if (fonts[char.toLowerCase()]) {
        formattedAnswer += fonts[char.toLowerCase()];
      } else {
        formattedAnswer += char;
      }
    }

    await api.sendMessage(`${formattedAnswer}`, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
         
