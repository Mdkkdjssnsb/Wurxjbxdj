module.exports.config = {
	name: 'help',
	version: '1.0.0',
	role: 0,
	hasPrefix: true,
	aliases: ['help'],
	description: "Beginner's guide",
	usage: "Help [page] or [command]",
	credits: 'Develeoper',
};

module.exports.run = async function ({
	api,
	event,
	enableCommands,
	args,
	Utils,
	prefix
}) {
	const input = args.join(' ');
	try {
		const eventCommands = enableCommands[1].handleEvent;
		const commands = enableCommands[0].commands;
		if (!input) {
			const pages = 999;
			let page = 1;
			let start = (page - 1) * pages;
			let end = start + pages;
			let helpMessage = `📍|𝗔𝗟𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦\n\n`;
			for (let i = start; i < Math.min(end, commands.length); i++) {
				helpMessage += `╭───────────────⟡
│🟢 ${commands[1]}
╰───────────────⟡\n`;
			}
			helpMessage += '\n✅| 𝗘𝘃𝗲𝗻𝘁𝘀 𝗟𝗶𝘀𝘁\n━━━━━━━━━━━\n';
			eventCommands.forEach((eventCommand, index) => {
				helpMessage += `╭───────────────⟡
│🟢 ${eventCommand}
╰───────────────⟡\n`;
			});
			helpMessage += `╭───────────────⟡
│𝖬𝖺𝖽𝖾 𝗐𝗂𝗍𝗁 💜 𝖻𝗒 𝗔𝗿𝘆𝗮𝗻
│
│𝖧𝖾𝗋𝖾 𝗂𝗌 𝖺𝗎𝗍𝗈𝖻𝗈𝗍 𝗅𝗂𝗇𝗄:
│ https://orochi-community.onrender.com
╰───────────────⟡\n`;
			api.sendMessage(helpMessage, event.threadID, event.messageID);
		} else if (!isNaN(input)) {
			const page = parseInt(input);
			const pages = 100;
			let start = (page - 1) * pages;
			let end = start + pages;
			let helpMessage = `📍|𝗔𝗟𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦\n\n`;
			for (let i = start; i < Math.min(end, commands.length); i++) {
				helpMessage += `╭───────────────⟡
│🟢 ${commands[1]}
╰───────────────⟡\n`;
			}
			helpMessage += '\n✅| 𝗘𝘃𝗲𝗻𝘁𝘀 𝗟𝗶𝘀𝘁\n━━━━━━━━━━━\n';
			eventCommands.forEach((eventCommand, index) => {
				helpMessage += `╭───────────────⟡
│🟢 ${eventCommand}
╰───────────────⟡\n`;
			});
			helpMessage += `╭───────────────⟡
│𝖬𝖺𝖽𝖾 𝗐𝗂𝗍𝗁 💜 𝖻𝗒 𝗔𝗿𝘆𝗮𝗻
│
│𝖧𝖾𝗋𝖾 𝗂𝗌 𝖺𝗎𝗍𝗈𝖻𝗈𝗍 𝗅𝗂𝗇𝗄:
│ https://orochi-community.onrender.com
╰───────────────⟡\n`;
			api.sendMessage(helpMessage, event.threadID, event.messageID);
		} else {
			const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
			if (command) {
				const {
					name,
					version,
					role,
					aliases = [],
					description,
					usage,
					credits,
					cooldown,
					hasPrefix
				} = command;
				const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
				const aliasesMessage = aliases.length ? `│🏷️ 𝗔𝗹𝗶𝗮𝘀𝗲𝘀: ${aliases.join(', ')}\n` : '';
				const descriptionMessage = description ? `│📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${description}\n` : '';
				const usageMessage = usage ? `│🔎 𝗨𝘀𝗮𝗴𝗲: ${usage}\n` : '';
				const creditsMessage = credits ? `│👑 𝗖𝗿𝗲𝗱𝗶𝘁𝘀: ${credits}\n` : '';
				const message = `📍| 𝗚𝗨𝗜𝗗𝗘\n
╭───────────────⟡
│📢 𝗡𝗮𝗺𝗲: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}
╰───────────────⟡`;
				api.sendMessage(message, event.threadID, event.messageID);
			} else {
				api.sendMessage('Command not found.', event.threadID, event.messageID);
			}
		}
	} catch (error) {
		console.log(error);
	}
};
