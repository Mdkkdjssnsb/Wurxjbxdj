const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "pinterest",
  version: "1.0.0",
  role: 0,
  credits: "ArYAN",
  description: "Image search",
  hasPrefix: true,
  commandCategory: "Search",
  usages: "[Text]",
  cooldowns: 0,
  aliases: ["pin"],
};

module.exports.run = async function ({ api, event, args }) {
  const keySearch = args.join(" ");
  if (!keySearch.includes("-")) {
    return api.sendMessage(
      'Please enter in the format, example: pinterest Coco Martin - 10 (20 limit only)',
      event.threadID,
      event.messageID
    );
  }

  const keySearchs = keySearch.substring(0, keySearch.indexOf("-")).trim();
  const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;

  if (isNaN(numberSearch) || numberSearch <= 0 || numberSearch > 20) {
    return api.sendMessage(
      'Please enter a valid number of images to search (1-20)',
      event.threadID,
      event.messageID
    );
  }

  try {
    const res = await axios.get(`https://himachalwale.onrender.com/api/pinterest2?search=${encodeURIComponent(keySearchs)}&keysearch=${numberSearch}&apikey=©himachalwale`);
    const data = res.data.result;
    let imgData = [];

    for (let i = 0; i < numberSearch; i++) {
      let imagePath = path.join(__dirname, `/cache/${i + 1}.jpg`);
      let getDown = (await axios.get(`${data[i]}`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(imagePath, Buffer.from(getDown, "utf-8"));
      imgData.push(fs.createReadStream(imagePath));
    }

    api.sendMessage({
      attachment: imgData,
      body: `📸 𝗣𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁\n━━━━━━━━━━━━━━━\n\nShowing top ${numberSearch} results for your query "${keySearchs}"`
    }, event.threadID, event.messageID);

    for (let i = 0; i < numberSearch; i++) {
      fs.unlinkSync(path.join(__dirname, `/cache/${i + 1}.jpg`));
    }
  } catch (error) {
    console.error("Error in pinterest command:", error);
    api.sendMessage("An error occurred while fetching the images.", event.threadID, event.messageID);
  }
};
