const fs = require("fs");
const LOGGER = require("../services/TiktokLogger");
const Discord = require("discord.js");
const TikTokDownloadService = require("../services/TikTokDownloadService");
require("dotenv").config();

const client = new Discord.Client();
const tiktokDownloadService = new TikTokDownloadService();

const config = {
  deleteMessage: false,
};

client.on("ready", () => {
  LOGGER.info(`Logged in as ${client.user.tag}!`);
});

const mobileShortLinkRegex = new RegExp("https://vm.tiktok.com/w*");
const userIdWithVideoIdRegex = new RegExp("https://www.tiktok.com/@w*");
const BOT_ID = "479285814690447361";

client.on("message", async (msg) => {
  LOGGER.info(`${msg.author.tag} (${msg.author.username}): ${msg.content}`);
  if (
    (mobileShortLinkRegex.test(msg.content) ||
      userIdWithVideoIdRegex.test(msg.content)) &&
    msg.author.username !== client.user.username
  ) {
    // post tiktok from any message irregadless of response
    let url = msg.content.split("https")[1].split(" ")[0];
    url = "https" + url;

    try {
      // const expandedUrl = await urlExpandService.expandUrl(url);
      const pathUrl = await tiktokDownloadService.downloadVideo(url);
      msg
        .reply(`Replaced your link of ${url} with a video :D`, {
          files: [{ attachment: `${pathUrl}` }],
        })
        .catch((err) => {
          LOGGER.error(err);
        })
        .finally(() => {
          fs.unlink(pathUrl, (err) => {
            if (err) {
              LOGGER.error(`Error: Failed to delete ${pathUrl}`);
            } else {
              LOGGER.info(`${pathUrl} was deleted.`);
            }
          });
        })
        .then(() => {
          if (config.deleteMessage) {
            msg.delete().catch((rejected) => LOGGER.error(rejected));
          }
        });
    } catch (error) {
      LOGGER.error(`failed with ${error}`);
    }
  } else if (msg.content == "!tictaco delete toggle") {
    config.deleteMessage = !config.deleteMessage;
    msg.reply(`will now ${config.deleteMessage ? "" : "not "}delete message`);
  } else if (msg.content == "!tictaco help") {
    msg.reply(
      `\n\`!tictaco delete toggle\`\nDeletes the original message you sent if enabled. Currently set to deleteMessage=\`${config.deleteMessage}\``
    );
  }

  if (msg.author.id == BOT_ID) {
    msg.suppressEmbeds(true);
  }

});

client.login(process.env.token);
