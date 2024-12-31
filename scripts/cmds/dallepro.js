const { GoatWrapper } = require("fca-liane-utils");
const axios = require('axios');
const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
  return base.data.api;
}; 
module.exports = {
  config: {
    name: "dallepro",
    aliases: ["bingpro", "create", "imaginepro"],
    version: "1.0",
    author: "Dipto",
    countDown: 15,
    role: 2,
    description: "Generate images by Unofficial DallePro",
    category: "download",
    guide: { en: "{pn} prompt" }
  }, 
  onStart: async({ api, event, args }) => {
    const prompt = (event.messageReply?.body.split("dalle")[1] || args.join(" ")).trim();
    if (!prompt) return api.sendMessage("❌| Wrong Format. ✅ | Use: 17/18 years old boy/girl watching football match on TV with 'Nisan' and '10' written on the back of their dress, 4k", event.threadID, event.messageID);
    try {
       //const cookies = "cookies here (_U value)";
const cookies = ["19ysPGV2irWMx5aJX_k-Qn4U9hlmPKDgXYhi30OU9GpKHxz3-FMG6E36S0bDGEtkOJ0HQx58_JhQoQUDgwDLf3qvxaRhw38DUi5cLa62POL404nExskE4bkkDB-VUoIynyVNyUfAuDd-XKpUaCkW14nQHsF4Ku1BxL-sNCNEiSSQfYjuGzm6yA79cneAuYl3F88EIxhq-OnDxeIV6v_HTww"];
const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
      const wait = api.sendMessage("ᴘʟᴢ ᴡᴀɪᴛ ʙᴀʙʏ 😽", event.threadID);
      const response = await axios.get(`${await baseApiUrl()}/dalle?prompt=${prompt}&key=dipto008&cookies=${randomCookie}`);
const imageUrls = response.data.imgUrls || [];
      if (!imageUrls.length) return api.sendMessage("Empty response or no images generated.", event.threadID, event.messageID);
      const images = await Promise.all(imageUrls.map(url => axios.get(url, { responseType: 'stream' }).then(res => res.data)));
    api.unsendMessage(wait.messageID);
   api.sendMessage({ body: `✅ | ʜᴇʀᴇ's ʏᴏᴜʀ Gᴇɴᴇʀᴀᴛᴇᴅ Dᴀʟʟᴇᴘʀᴏ Pʜᴏᴛᴏ 😘`, attachment: images }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
    }
  }
}
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
