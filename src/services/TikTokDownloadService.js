const TikTokScrapper = require('tiktok-scraper');
const { exec } = require("child_process"); 

module.exports = class TikTokDownloadService {
    constructor() {}

    async downloadVideo(expandedUrl, shortenedUrl) {
        const id = this.parseUrlForId(expandedUrl);
        let pathUrl = await this.useCLITiktokScraper(shortenedUrl, id)
        return pathUrl;
    }

    parseUrlForId(url) {
        return url.split('/')[4].split('.')[0];
    }

    useCLITiktokScraper(shortenedUrl, id) {
        return new Promise((resolve, reject) => {
            exec(['tiktok-scraper', 'video', shortenedUrl, '-d'].join(' ')).on("close", (code, signal) => {
                resolve(`${id}.mp4`)
            })
        })
    }
    
}