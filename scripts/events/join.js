module.exports.config = {
  name: "join",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Mirai-Team", // FIXED BY YAN Nayan
  description: "GROUP UPDATE NOTIFICATION"
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[${global.config.PREFIX} ]  ${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`আসসালামুআলাইকুম 💖
____________________________________
🤖
BOT CONNECTED!!! 
adding in the group chat successfully!!!
😈 কিরে বাঁদর গুলা শয়তানি করার জন্য অ্যাড দিছস 😈
____________________________________\n\nযেকোনো কমান্ড দেখতে ${global.config.PREFIX}help ব্যবহার করুন
\n\উদাহারণ:\n${global.config.PREFIX}mark (text)\n${global.config.PREFIX}lexi (text)\n${global.config.PREFIX}trump (text)\n${global.config.PREFIX}info
____________________________________
যেকোনো অভিযোগ অথবা হেল্প এর জন্য আমার BOSS 
𝙈𝘼𝙃𝘼𝘽𝙐𝙍_কে নক করতে পারেন 
👉FB link: https://www.facebook.com/profile.php?id=100077458062491
-
`, attachment: fs.createReadStream(__dirname + "/nayan/join/received_908287014131424.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "আসসালামু আলাইকুম🌺 🥀༊🤗😻🤗 {name}  😍.\n\n🌸༊🥀۞Wellcome-!!-🌻🥀 To {threadName}\n{type} You are the {soThanhVien} member of this group🌻.\n\n𝄞❤️⋆⃝⑅⑅⃝•BOT OWNER♥🖤 Mahabur Rahaman ❤️😇Never Try To Spam Here🚫\n\n 『Mahabur Rahaman♥』\n\n🥰 Follow Our Group Rules✅\n\n🤖 Hi I'm  messenger bot use '/help' to see command 🤖." : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
  }
