const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "shoti",
    version: "1.0.0",
    credits: "ArYAN",
    description: "Generate random tiktok girl videos",
    role: 0,
    commandCategory: "other",
    usage: "[shoti]",
    cooldowns: 5,
    dependencies: [],
    usePrefix: true,
};

module.exports.run = async function({
    api,
    event
}) {
    try {
      const response = await axios.get("https://aryanapiz.onrender.com/api/shoti");
      const data = response.data.data;
      const username = data.user.username || "@user_unknown";
      const nickname = data.user.nickname || "@unknown_nickname";
      const region = data.region || "unknown region";
      const duration = data.duration || "unknown duration";
      const title = data.title || "unknown title";
      const userID = data.user.userID || "unknown userID";

      const videoResponse = await axios.get(data.url, { responseType: "stream" });
      const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempVideoPath);
      videoResponse.data.pipe(writer);
      
      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);
        await message.reply({
          body: `Username: "${username}"\nNickname: "${nickname}"\nRegion: "${region}"\nDuration: "${duration}"\nTitle: "${title}"\nUserID: "${userID}"`,
          attachment: stream,
        });
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        fs.unlink(tempVideoPath, (err) => {
          if (err) console.error(err);
          console.log(`Deleted ${tempVideoPath}`);
        });
      });
    } catch (error) {
      console.error(error);
      message.reply("Sorry, an error occurred while processing your request.");
    }
  }
};
