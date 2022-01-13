const TikTokScrapper = require("tiktok-scraper");
const { exec } = require("child_process");

module.exports = class TikTokDownloadService {
  constructor() {}

  async downloadVideo(expandedUrl, shortenedUrl) {
    const id = shortenedUrl
      ? this.parseUrlForId(expandedUrl)
      : this.parseLongUrlForId(expandedUrl);
    let pathUrl = await this.useCLITiktokScraper(
      shortenedUrl ? shortenedUrl : expandedUrl,
      id
    );
    return pathUrl;
  }

  useCLITiktokScraper(url, id) {
    return new Promise((resolve, reject) => {
      console.log(`tiktok-scraper video ${url} -d`);
      exec(["tiktok-scraper", "video", url, "-d"].join(" ")).on(
        "close",
        (code, signal) => {
          resolve(`${id}.mp4`);
        }
      );
    });
  }

  parseUrlForId(url) {
    return url.split("/")[4].split(".")[0];
  }

  parseLongUrlForId(url) {
    return url.split("/")[5].split("?")[0].split("/")[0].split("?")[0];
  }
};
