const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
    name: "notification",
    version: "1.1.1",
    role: 2,
    description: "Sends a message to all groups and can only be done by the admin.",
    hasPrefix: true,
    aliases: ["noti"],
    usages: "noti [ text ]",
    cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
    const threadList = await api.getThreadList(10000, null, ["INBOX"]);
    const custom = args.join(" ");
    const messageContent = `『 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍 』\n\n${custom}`;

    const sendMessagePromises = threadList
        .filter(thread => thread.isGroup && thread.threadID != event.threadID)
        .map(thread => api.sendMessage(messageContent, thread.threadID));

    try {
        await Promise.all(sendMessagePromises);
        api.sendMessage(`› Sent the notification successfully.`, event.threadID);
    } catch (error) {
        console.error("Error sending a message:", error);
        api.sendMessage(`› An error occurred while sending the notification.`, event.threadID);
    }
};
