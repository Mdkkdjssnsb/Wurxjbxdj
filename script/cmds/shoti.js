const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "shoti",
  version: "1.0.0",
  credits: "ArYAN",
  description: "Generate random TikTok girl videos",
  role: 0,
  commandCategory: "other",
  usage: "[shoti]",
  cooldowns: 5,
  dependencies: [],
  usePrefix: true,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get("https://itsaryanapis.onrender.com/api/shoti");
    const data = response.data.data;
    const username = data.user.username || "@user_unknown";
    const nickname = data.user.nickname || "@unknown_nickname";
    const region = data.region || "unknown region";
    const duration = data.duration || "unknown duration";
    const title = data.title || "unknown title";
    const userID = data.user.userID || "unknown userID";

    const videoResponse = await axios.get(data.url, { responseType: "stream" });

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    const tempVideoPath = path.join(cacheDir, `${Date.now()}.mp4`);
    const writer = fs.createWriteStream(tempVideoPath);
    videoResponse.data.pipe(writer);

    writer.on("finish", async () => {
      const stream = fs.createReadStream(tempVideoPath);
      api.sendMessage(
        {
          body: `Username: "${username}"\nNickname: "${nickname}"\nRegion: "${region}"\nDuration: "${duration}"\nTitle: "${title}"\nUserID: "${userID}"`,
          attachment: stream,
        },
        event.threadID,
        () => {
          fs.unlink(tempVideoPath, (err) => {
            if (err) console.error(err);
            console.log(`Deleted ${tempVideoPath}`);
          });
          api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        }
      );
    });

    writer.on("error", (error) => {
      fs.unlink(tempVideoPath, () => {});
      api.sendMessage("❌ | Error writing video file: " + error.message, event.threadID);
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("Sorry, an error occurred while processing your request.", event.threadID);
  }
};
