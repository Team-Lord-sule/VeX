const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
  config: {
    name: "upt",
aliases: ["👉🙂👈","up"],
    version: "1.0",
    author: "you",
    role: 0,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "info",
    guide: {
      en: "Type {pn}"
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `
├─⏰:【ԋσυɾʂ=${hours}】
├─⌚:【ɱιɳιƚ=${minutes}】
├─⏳:【ʂҽƈσɳԃ=${seconds}】`;
      
      api.sendMessage(`╭[ 👈🍥👉 ]  ─⦿
├───【 𝑼𝑷𝑻𝑰𝑴𝑬】─────   ─⦿  
├───【𝙷𝙴𝙻𝙻𝙾 𝙴𝚅𝙴𝚁𝚈𝙾𝙽𝙴】─⦿
├────────────────  ─⦿\n├───────────────   ─⦿${uptimeString}\n├─👥:【Total Users= ${allUsers.length}】\n├─📬:【Total Threads= ${allThreads.length}】
╰───────────────────❏`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
