const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports.config = {
    name: "emi",
    version: "1.0.0",
    role: 0,
    credits: "ArYAN",
    description: "Generate anime images based on emi style",
    hasPrefix: true,
    commandCategory: "Search",
    usages: "[Text]",
    cooldowns: 0,
};
module.exports.run = async function({ message, args, event }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt = text;

    try {
      message.reply("generating your Imagination, please wait...").then((info) => { id = info.messageID });

      const API = `https://himachalwale.onrender.com/api/emi?prompt=${encodeURIComponent(prompt)}&apikey=©himachalwale`;
      const imageStream = fs.createReadStream(API);

      return message.reply({
        body: `🖼️`,
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      message.reply("Failed to generate your imagination.");
    }
  }
};
