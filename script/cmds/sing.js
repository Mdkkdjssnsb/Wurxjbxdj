module.exports.config = {
  name: "sing",
  version: "2.0.4",
  role: 0,
  credits: "Grey",
  description: "Play a song",
  aliases: ["play", "music", "song"],
  cooldown: 0,
  hasPrefix: false,
  usage: "sing [ Song Name ]",
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("@distube/ytdl-core");
  const request = require("request");
  const yts = require("yt-search");
  const path = require("path");

  const formatFileSize = (bytes, decimalPoint) => {
    if (bytes == 0) return '0 Bytes';
    let k = 1024,
      dm = decimalPoint || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  try {
    const input = event.body;
    const text = input.substring(5);
    const data = input.split(' ');

    if (data.length < 2) {
      return api.sendMessage(`⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗲\n━━━━━━━━━━━━\n\nPlease provide specify music name!`, event.threadID);
    }

    data.shift();
    const musicName = data.join(' ');

    api.setMessageReaction('⏰', event.messageID, () => {}, true);

    const searchResults = await yts(musicName);
    if (!searchResults.videos.length) {
      api.sendMessage(`⛔|𝗡𝗼 𝗗𝗮𝘁𝗮\n━━━━━━━━━━━━\n\nNo music found.`, event.threadID);
      return;
    }

    const music = searchResults.videos[0];
    const musicUrl = music.url;

    const stream = ytdl(musicUrl, { filter: 'audioonly' });

    const fileName = `${event.senderID}.mp3`;
    const filePath = path.join(__dirname, 'cache', fileName);

    const writeStream = stream.pipe(fs.createWriteStream(filePath));

    writeStream.on('finish', () => {
      console.info('[DOWNLOADER] Downloaded');

      const fileSize = formatFileSize(fs.statSync(filePath).size);
      const musicDuration = music.duration.timestamp;

      const likes = music.likes !== undefined ? music.likes : 'N/A';
      const dislikes = music.dislikes !== undefined ? music.dislikes : 'N/A';
      const views = music.views !== undefined ? music.views : 'N/A';

      const message = {
        body: `🎶|𝗬𝗧 𝗠𝗨𝗦𝗜𝗖\n━━━━━━━━━━━━\n\n✨ 𝗧𝗶𝘁𝗹𝗲: ${music.title}\n\n📅 𝗣𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱 𝗼𝗻: ${music.ago}\n\n👀 𝘃𝗶𝗲𝘄𝘀 : ${views}\n\n👎 𝗗𝗶𝘀𝗹𝗶𝗸𝗲𝘀: ${dislikes}\n\n👍 𝗟𝗶𝗸𝗲𝘀: ${likes}\n\n⏳ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${musicDuration}\n\n🖇️ 𝗙𝗶𝗹𝗲 𝗦𝗶𝘇𝗲: ${fileSize}\n\n🎵 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${music.author.name}\n\n📎 𝗨𝗥𝗟: ${music.url}`,
        attachment: fs.createReadStream(filePath),
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
        api.setMessageReaction('✅', event.messageID, () => {}, true);
      });
    });

    writeStream.on('error', (error) => {
      console.error('[ERROR]', error);
      api.sendMessage('⛔|𝗘𝗿𝗿𝗼𝗿\n━━━━━━━━━━━━\n\nSorry, an error occurred while processing the command.', event.threadID);
    });

  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('⛔|𝗘𝗿𝗿𝗼𝗿\n━━━━━━━━━━━━\n\nSorry, an error occurred while processing the command.', event.threadID);
  }
};
