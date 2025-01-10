const { getStreamFromURL } = require("fb-watchman");
module.exports = {
  config: {
    name: "info",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "info about bot and owner",
    category: "tools",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "https://i.imgur.com/snnzKzT.jpeg";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;

    const ment = [{ id: id, tag: name }];
    const a = "𝐽𝐴𝑌𝐹𝐸𝑁𖣘𝘽𝙤𝙩࿐";
    const b = " - ";
    const c = "𝐽𝑎𝑦𝑑𝑒𝑛 𝑆𝑚𝑜𝑡ℎ";
const e = "Male";
    const d = "m.me/lordjaydenSmith.1";
const f = "ig.me/lordking9857";
const g = "taken🙂";

    message.reply({ 
      body: `${name}, here is the information 🌝
🌸 Bot's Name: ${a}
🌸 Bot's prefix: ${b}  
🌸 Owner: ${c}
🌸 Gender: ${e}
🌸 Messenger: ${d}
🌸 Insta: ${f}
🌸 Relationship: ${g}`,
mentions: ment,
      attachment: attachment });
  }
};
