const fs = require("fs");
const Discord = require("discord.js");
const TikTokDownloadService = require("../services/TikTokDownloadService");
require("dotenv").config();

const client = new Discord.Client();
const tiktokDownloadService = new TikTokDownloadService();

const config = {
  deleteMessage: false,
  suppressEmbeds: false,
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const mobileShortLinkRegex = new RegExp("https://vm.tiktok.com/w*");
const userIdWithVideoIdRegex = new RegExp("https://www.tiktok.com/@w*");
const BOT_ID = "479285814690447361";

client.on("message", async (msg) => {
  if (
    (mobileShortLinkRegex.test(msg.content) ||
      userIdWithVideoIdRegex.test(msg.content)) &&
    msg.author.username !== client.user.username
  ) {
    console.log("READING THIS MESSAGE: " + msg.content);

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
          console.log(err);
        })
        .finally(() => {
          fs.unlink(pathUrl, (err) => {
            if (err) {
              console.log(`Error: Failed to delete ${pathUrl}`);
            } else {
              console.log(`${pathUrl} was deleted.`);
            }
          });
        })
        .then(() => {
          if (config.deleteMessage) {
            msg.delete().catch((rejected) => console.log("BALLS: " + rejected));
          }
          if (config.suppressEmbeds && !config.deleteMessage) {
            msg.suppressEmbeds(config.suppressEmbeds);
          }
        });
    } catch (error) {
      console.log(`failed with ${error}`);
    }
  } else if (msg.content == "!tictaco delete toggle") {
    config.deleteMessage = !config.deleteMessage;
    msg.reply(`will now ${config.deleteMessage ? "" : "not "}delete message`);
  } else if (msg.content == "!tictaco supress embed toggle") {
    config.suppressEmbeds = !config.suppressEmbeds;
    msg.reply(
      `will now ${config.suppressEmbeds ? "" : "not "}supress embeds in messages`
    );
  } else if (msg.author.id === BOT_ID) {
    msg.suppressEmbeds(true);
  } else if (msg.content == "!tictaco help") {
    msg.reply(
      "\n`!tictaco delete toggle`\nDeletes the original message you sent if enabled\n`!tictaco supress embed toggle`\nWill remove the Embed of your tiktok url to tidy things up"
    );
  }
});

client.login(process.env.token);
