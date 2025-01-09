const { GoatWrapper } = require("fca-liane-utils");
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 𝘽𝙤𝙩 ‎]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "Lord King",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "Guide",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += ``; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭━═━┈⟬${category.toUpperCase()}⟭`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `◈ ${item}`);
            msg += `\n┣➣${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰━━━━━━═━┈┈━═━━━━━☻`;
        }
      });

      const totalCommands = commands.size;
      msg += `
👉━━━━━━━━𝘞𝘩𝘢𝘵━━━━━━━━━👈\     Total Commands:  [ ${totalCommands} ]\n📬 type ${prefix}Help cmd\n`;
      msg += ``;
      msg += `\system Prefix: [-]
👑 Owner: jayden smith
🔗 fb link: https://m.me/lordjaydenSmith.1 
𝗪𝗵𝗮𝘁 𝗱𝗼 𝘆𝗼𝘂 𝘄𝗮𝗻𝘁 𝗸𝗻𝗼𝘄.
👉━━━━━━━━𝘞𝘩𝘢𝘵━━━━━━━━━👈`; // its not decoy so change it if you want 


      await message.reply({
        body: msg,
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `𝑯𝑬𝑳𝑷 𝑪𝑴𝑫 𝑰𝑺 𝑯𝑬𝑹𝑬 𝑻𝑶 𝑨𝑺𝑺𝑰𝑺𝑻 𝒀𝑶𝑼.
 ☜♡☞
\n❃━━━━━━━━━${confingCommand.name}━━━━━━━❃\n
❊ 𝘕𝘢𝘮𝘦: ${confingCommand.name}
❊ 𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘵𝘪𝘰𝘯: ${longDescription}
❊ 𝘖𝘵𝘩𝘦𝘳 𝘯𝘢𝘮𝘦𝘴: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
❊ 𝘳𝘰𝘭𝘦: 3 ◎${roleText}◎
❊ 𝘈𝘶𝘵𝘩𝘰𝘳: ${author}
\n❃━━━━━━━━━━━━━━━━━━━━━━❃\n
𝘏𝘢𝘷𝘦 𝘢 𝘨𝘰𝘰𝘥 𝘵𝘪𝘮𝘦 𝘶𝘴𝘪𝘯𝘨 𝘮𝘺 𝘤𝘮𝘥 ◕ ‿ ◕
\n❁━━━━━━━━━━━━━━━━━━━━━━❁\n`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
