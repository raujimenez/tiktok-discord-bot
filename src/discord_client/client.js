const fs = require('fs');
const Discord = require('discord.js');
const UrlExpandService = require('../services/UrlExpandService');
const TikTokDownloadService = require('../services/TikTokDownloadService');
require('dotenv').config();


const client = new Discord.Client();
const urlExpandService = new UrlExpandService();
const tiktokDownloadService = new TikTokDownloadService();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const mobileShortLinkRegex = new RegExp('https://vm.tiktok.com/\w*')
const userIdWithVideoIdRegex = new RegExp('https://www.tiktok.com/@\w*');

client.on('message', async (msg) => {

  if (mobileShortLinkRegex.test(msg.content) || userIdWithVideoIdRegex.test(msg.content)) {
    const url = msg.content;
    try {
        const expandedUrl = await urlExpandService.expandUrl(url);
        const pathUrl = await tiktokDownloadService.downloadVideo(
            mobileShortLinkRegex.test(msg.content) ? expandedUrl : url, 
            mobileShortLinkRegex.test(msg.content) ? url : null);
        
        msg.reply(`Replaced your link of ${url} with a video :D`, {
            files: [{attachment: `${pathUrl}`}]
        }).catch((err) => {
            console.log(error)
        }).finally(() => {
            fs.unlink(pathUrl, (err) => {
                if (err) {
                    console.log(`Error: Failed to delete ${pathUrl}`)
                }
                else {
                    console.log(`${pathUrl} was deleted.`)
                }
            });
        })

        msg.delete().catch((rejected) => console.log(rejected))
    } catch(error) {
        console.log(`failed with ${error}`);
    }
  }
});

client.login(process.env.token);