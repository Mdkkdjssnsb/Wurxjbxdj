/*
 * (ENGLISH VERSION)
 * © Copyright NTKhang (Goatbot)
 * All rights reserved. This command is the intellectual property of Goatbot. Unauthorized reproduction or distribution of this command, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.
 *
 *
 * Welcome to the AI Command!
 *
 * 🤖 Explore GPT models and Other Features.
 *
 * Usage:
 * - ai [question]: Ask any question and get detailed answers from the AI.
 * - ai models: Explore available GPT models for different tasks.
 * - ai lyrics [songName]: Get the lyrics of a song.
 * - ai pin query (title) - (number): Discover images based on a search query.
 * - ai send video [query]: Find and send videos.
 * - ai send music [query]: Send music files.
 * - ai send shoti: Get a short video.
 *
 *----------------------------------------------------------
 *
 * (VIETNAMESE VERSION)
 * © Bản quyền NTKhang (Goatbot)
 * Đã đăng ký Bản quyền. Lệnh này là tài sản trí tuệ của AryanAPIs | ArYAN | Romeo. Việc sao chép hoặc phân phối trái phép lệnh này hoặc bất kỳ phần nào của nó có thể dẫn đến các hình phạt dân sự và hình sự nghiêm trọng và sẽ bị truy tố ở mức tối đa có thể theo luật.
 *
 *
 * Chào mừng đến với Bộ chỉ huy AI!
 *
 * 🤖 Tương tác với các mô hình GPT của OpenAI và nhận lời bài hát.
 *
 * Cách sử dụng:
 * - ai [câu hỏi]: Hỏi bất kỳ câu hỏi nào và nhận câu trả lời chi tiết từ AI.
 * - mô hình ai: Khám phá các mô hình GPT có sẵn cho các nhiệm vụ khác nhau.
 * - ai lời bài hát [songName]: Lấy lời bài hát.
 * - ai pin query (tiêu đề) - (số): Khám phá hình ảnh dựa trên truy vấn tìm kiếm.
 * - ai send video [truy vấn]: Tìm và gửi video.
 * - ai gửi nhạc [truy vấn]: Gửi file nhạc.
 * - ai send shoti: Lấy một đoạn video ngắn.
 *
 * Powered by ArYAN | Romeo
 */

const axios = require('axios');
const fs = require('fs-extra');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const path = require('path');

const models = [
  "gpt-4",
  "gpt-4-0613",
  "gpt-4-32k",
  "gpt-4-0314",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo-0613",
  "gpt-3.5-turbo-16k-0613",
  "gpt-3.5-turbo-0301",
  "text-davinci-003",
  "text-davinci-002",
  "code-davinci-002",
  "gpt-3",
  "text-curie-001",
  "text-babbage-001",
  "text-ada-001",
  "davinci",
  "curie",
  "babbage",
  "ada",
  "babbage-002",
  "davinci-002"
];

const defaultModel = "gpt-4";
const apiEndpoint = "https://itsaryanapis.onrender.com";

module.exports.config = {
  name: "ai",
  version: 1.0,
  credits: "ArYAN | ChatGPT",
  description: "Ask an question to 𝖢𝗁𝖺𝗍𝖦𝖯𝖳",
  hasPrefix: false,
  usages: "{pn} [prompt]",
  cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const prefix = 'ai';
    const command = event.body.trim();

    if (!command.toLowerCase().startsWith(prefix)) return;

    const prompt = command.substring(prefix.length).trim();

    if (!prompt) {
      return api.sendMessage(
        "𝖧𝖾𝗅𝗅𝗈! 𝗉𝗅𝖾𝖺𝗌𝖾 𝖺𝖽𝖽 𝗒𝗈𝗎𝗋 𝗣𝗿𝗼𝗺𝗽𝘁 𝗜𝗻𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻 𝘁𝗼 𝗀𝗲𝘁 𝖺 𝖲𝗉𝖾𝖼𝗂𝖿𝗂𝖼 𝖱𝖾𝗌𝗉𝗈𝗇𝗌𝖾. \n\n╭──🌼 \n│𝖺𝗂 ( 𝖸𝗈𝗎𝗋 𝗇𝗈𝗋𝗆𝖺𝗅 𝗉𝗋𝗈𝗆𝗉𝗍𝗌) \n│𝖺𝗂 𝗌𝖾𝗇𝗍 𝗅𝗒𝗋𝗂𝖼𝗌 ( 𝗌𝗈𝗇𝗀𝖭𝖺𝗆𝖾 ) \n│𝖺𝗂 𝗍𝗆 𝗀𝖾𝗇/𝗂𝗇𝖻𝗈𝗑 ( 𝖾𝗆𝖺𝗂𝗅 ) \n│𝖺𝗂 𝗌𝖾𝗇𝗍 𝗆𝗎𝗌𝗂𝖼 ( 𝗌𝗈𝗇𝗀𝖭𝖺𝗆𝖾 ) \n│𝖺𝗂 𝗌𝖾𝗇𝖽 𝗌𝗁𝗈𝗍𝗂 \n│𝖺𝗂 𝗌𝖾𝗇𝖽 𝗏𝗂𝖽𝖾𝗈 ( 𝗏𝗂𝖽𝖾𝗈 𝗍𝗂𝗍𝗅𝖾) \n│𝖺𝗂 𝗉𝖾𝗑𝖾𝗅𝗌 𝗊𝗎𝖾𝗋𝗒 ( 𝗍𝗂𝗍𝗅𝖾 ) - (𝗇𝗎𝗆𝖻𝖾𝗋)\n│𝖺𝗂 𝗉𝗂𝗇 𝗊𝗎𝖾𝗋𝗒 ( 𝗍𝗂𝗍𝗅𝖾 ) - (𝗇𝗎𝗆𝖻𝖾𝗋) \n╰─────────────🌼\n\n 📝 𝗲𝘅𝗮𝗺𝗽𝗹𝗲: ai send music metamorphosis.",
        event.threadID,
        event.messageID
      );
    }

    switch (true) {
      case prompt.toLowerCase() === 'models': {
        return api.sendMessage(
          `👑 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗠𝗼𝗱𝗲𝗹𝘀\n━━━━━━━━━━━━━━━\n\n${models.join('\n')}`,
          event.threadID,
          event.messageID
        );
      }
      case prompt.toLowerCase().startsWith('send music'): {
        const songName = prompt.split(' ').slice(2).join(' ');
        const searchResults = await yts(songName);

        if (!searchResults.videos.length) {
          return api.sendMessage("❗No song found for the given query.", event.threadID, event.messageID);
        }

        const video = searchResults.videos[0];
        const stream = ytdl(video.url, { filter: "audioonly" });
        const filePath = path.join(__dirname, "tmp", "music.mp3");

        stream.pipe(fs.createWriteStream(filePath));
        stream.on('end', async () => {
          const audioStream = fs.createReadStream(filePath);

          await api.sendMessage({
            body: `🎧 𝗠𝗨𝗦𝗜𝗖\n━━━━━━━━━━━━━━━\n\n📝 𝗧𝗶𝘁𝗹𝗲: ${video.title}\n🔎 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${video.author.name}\n📅 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱: ${video.uploadDate}\n👀 𝗩𝗶𝗲𝘄𝘀: ${video.views}\n🖇 𝗨𝗥𝗟: ${video.url}\n⏰ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${video.timestamp}`,
            attachment: audioStream
          }, event.threadID);

          fs.unlinkSync(filePath);
        });

        return;
      }
      case prompt.toLowerCase().startsWith('send video'): {
        try {
          const songName = prompt.split(' ').slice(2).join(' ');
          const searchResults = await yts(songName);

          if (!searchResults || !searchResults.all || searchResults.all.length === 0) {
            return api.sendMessage("❗No video found for the given query.", event.threadID, event.messageID);
          }

          const video = searchResults.all.find(result => result.type === 'video');

          if (!video) {
            return api.sendMessage("❗No video found for the given query.", event.threadID, event.messageID);
          }

          const stream = ytdl(video.url);
          const filePath = path.join(__dirname, "tmp", "music.mp4");
          const writer = fs.createWriteStream(filePath);
          let videoSize = 0;

          stream.pipe(writer);
          stream.on('data', chunk => {
            videoSize += chunk.length;

            if (videoSize > 55 * 1024 * 1024) {
              stream.destroy();
              writer.close();
              fs.unlinkSync(filePath);
              return api.sendMessage("❗Video size exceeds the limit of 55 MB.", event.threadID, event.messageID);
            }
          });

          stream.on('end', async () => {
            const videoStream = fs.createReadStream(filePath);

            await api.sendMessage({
              body: `📹 𝗩𝗜𝗗𝗘𝗢\n━━━━━━━━━━ \n\n📝 𝗧𝗶𝘁𝗹𝗲: ${video.title} \n🔎 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${video.author.name}\n 📅 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱: ${video.uploadDate} \n👀 𝗩𝗶𝗲𝘄𝘀: ${video.views} \n🔗 𝗨𝗿𝗹: ${video.url} \n⏰ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${video.timestamp}`,
              attachment: videoStream,
            }, event.threadID);

            fs.unlinkSync(filePath);
          });
        } catch (error) {
          console.error(error);
          return api.sendMessage("❌ An error occurred while processing your request.", event.threadID, event.messageID);
        }

        return;
      }
      case prompt.toLowerCase().startsWith('send shoti'): {
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
          const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);
          const writer = fs.createWriteStream(tempVideoPath);

          videoResponse.data.pipe(writer);

          writer.on("finish", async () => {
            const stream = fs.createReadStream(tempVideoPath);

            await api.sendMessage({
              body: `🌼 𝗦𝗵𝗼𝘁𝗶 𝘃2 \n━━━━━━━━━━━━━━━\n\n📝 𝖳𝗂𝘁𝗅𝖾: ${title}\n🔎 𝖴𝗌𝖾𝗋𝗇𝖺𝗆𝖾: ${username}\n🏷 𝖭𝗂𝖼𝗄𝗇𝖺𝗆𝖾: ${nickname}"\n🌐 𝖱𝖾𝗀𝗂𝗈𝗇: "${region}"\n⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇: ${duration}\n🆔 𝖴𝗌𝖾𝗋𝖨𝖣: "${userID}`,
              attachment: stream,
            }, event.threadID);

            fs.unlink(tempVideoPath, (err) => {
              if (err) console.error(err);
              console.log(`Deleted ${tempVideoPath}`);
            });
          });
        } catch (error) {
          console.error(error);
          api.sendMessage("Sorry, an error occurred while processing your request.", event.threadID, event.messageID);
        }

        return;
      }
      case prompt.toLowerCase().startsWith('send lyrics'): {
        const songName = prompt.split(' ').slice(2).join(' ');

        if (!songName) {
          return api.sendMessage("❗Please provide a song name to fetch lyrics.", event.threadID, event.messageID);
        }

        const { data } = await axios.get(`${apiEndpoint}/api/lyrics?songName=${encodeURIComponent(songName)}`);

        if (!data.lyrics) {
          return api.sendMessage("❌ Lyrics not found for the given song name.", event.threadID, event.messageID);
        }

        return api.sendMessage(
          `ℹ 𝗧𝗶𝘁𝗹𝗲: ${data.title}\n\n👑 𝗔𝗿𝘁𝗶𝘀𝘁: ${data.artist}\n\n━━━━━━━━━━━━━━━\n✅ 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗬𝗢𝗨𝗥 𝗟𝗬𝗥𝗜𝗖𝗦\n${data.lyrics}`,
          event.threadID,
          event.messageID
        );
      }
      case prompt.toLowerCase().startsWith('pin query'): {
        try {
          const query = args.join(" ");

          if (!query.includes("-")) {
            return api.sendMessage(
              "⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲𝘀\n━━━━━━━━━━━━━━━\n\nPlease enter the search query and number of images (1-99)",
              event.threadID,
              event.messageID
            );
          }

          const [keySearchs, numberSearch] = query.split("-");
          let num = parseInt(numberSearch.trim()) || 20;
          const searchLimit = Math.min(num, 99);
          const apiUrl = `${apiEndpoint}/api/pinterest?query=${encodeURIComponent(keySearchs.trim())}&limits=${searchLimit}`;
          const res = await axios.get(apiUrl);
          const data = res.data;
          const imgData = [];

          for (let i = 0; i < Math.min(searchLimit, data.length); i++) {
            const imgResponse = await axios.get(data[i], { responseType: "arraybuffer" });
            const imgPath = path.join(__dirname, "cache", `${i + 1}.jpg`);
            await fs.outputFile(imgPath, imgResponse.data);
            imgData.push(fs.createReadStream(imgPath));
          }

          await api.sendMessage(
            {
              body: `📸 𝗣𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁\n━━━━━━━━━━━━━━━\n\nShowing top ${searchLimit} results for your query "${keySearchs.trim()}"`,
              attachment: imgData
            },
            event.threadID,
            event.messageID
          );

          // Remove cached images after sending
          await fs.remove(path.join(__dirname, "cache"));
        } catch (error) {
          console.error(error);
          return api.sendMessage(`An error occurred.`, event.threadID, event.messageID);
        }

        return;
      }
      default: {
        let selectedModel = defaultModel;
        const modelMatch = prompt.match(/^model\s+(\d+)/i);

        if (modelMatch) {
          const modelIndex = parseInt(modelMatch[1], 10) - 1;

          if (modelIndex >= 0 && modelIndex < models.length) {
            selectedModel = models[modelIndex];
            prompt = prompt.replace(modelMatch[0], '').trim();
          } else {
            return api.sendMessage("Invalid model number. Use '{p}ai models' to see available models.", event.threadID, event.messageID);
          }
        }

        const { data } = await axios.get(
          `${apiEndpoint}/api/gpt?prompt=${encodeURIComponent(prompt)}&model=${selectedModel}`
        );

        return api.sendMessage(`💭 𝗚𝗣𝗧 \n━━━━━━━━━━━━\n\n${data.original}`, event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("", event.threadID, event.messageID);
    api.setMessageReaction("❌", event.messageID, () => {}, true);
  }
};
