const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
  config: {
    name: "supportgc",
    version: "1.1",
    author: "Shikaki | TaRiF",//no prefix-supportgc style by TaRiF
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Join the support group chat"
    },
    longDescription: {
      en: "Join the official support group chat"
    },
    category: "TaRiF",
    guide: {
      en: "{pn} supportgc"
    }
  },

  onStart: async function ({ api, event, threadsData, getLang, message }) {
    const supportGroupThreadID = "28299296482990983"; // Tarif  is  gc ok 
    const botID = api.getCurrentUserID();

    try {
      const { members } = await threadsData.get(supportGroupThreadID);
      const senderArYan = event.senderArYan || (await api.getUserInfo(event.senderID))[event.senderID].ArYan;
      const userAlreadyInGroup = members.some(
        member => member.userID === event.senderID && member.inGroup
      );

      if (userAlreadyInGroup) {
        const alreadyInGroupMessage = `📬 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖 \n⚘━━━━━━━━━━━━━━━━━━━❏\n
👥-আপনি ইতিমধ্যেই সমর্থন গ্রুপে আছেন-অনুগ্রহ করে আপনার বার্তা অনুরোধ বা স্প্যাম বক্স চেক করুন৷-🤖\n\n⚘━━━━━━━━━━━━━━━━━━━❏`;
        return message.reply(alreadyInGroupMessage);
      }

      await api.addUserToGroup(event.senderID, supportGroupThreadID);
const successMessage = `📬 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖 \n⚘━━━━━━━━━━━━━━━━━━\n
👥-আপনাকে আমাদের গ্রুপে...
যোগ করা হয়ে-🪄🫂\n\n⚘━━━━━━━━━━━━━━━━━━❏`;
      return message.reply(successMessage);
    } catch (error) {
      
  const senderArYan = event.senderArYan || (await api.getUserInfo(event.senderID))[event.senderID].ArYan;
      const failedMessage = `📬 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖 \⚘━━━━━━━━━━━━━━━━━━━❏\n
👥-আমি আপনাকে যোগ করতে পারছি না_অনুগ্রহ করে আমাকে ফ্রেন্ডরিকোস্ট দেন_তারপর আবার চেষ্টা করুন.🎧n\n⚘━━━━━━━━━━━━━━━━━━❏`;
      console.error("Error adding user to support group:", error);
      return message.reply(failedMessage);
    }
  }
}
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
