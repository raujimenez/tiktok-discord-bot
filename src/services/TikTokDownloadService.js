const { exec } = require("child_process");

module.exports = class TikTokDownloadService {
  constructor() {}

  async downloadVideo(url) {
    const id = new Date().valueOf();
    let pathUrl = await this.useCLITiktokDownload(url, id);
    return pathUrl;
  }

  useCLITiktokDownload(url, id) {
    return new Promise((resolve, reject) => {
      const pythonCommand = process.platform !== 'win32' ? 'python3' : 'python';
      console.log(`${pythonCommand} download_service.py '${url}' ${id}`);
      exec([pythonCommand, "download_service.py", '"' + url + '"', id].join(" ")).on(
        "close",
        (code, signal) => {
          resolve(`${id}.mp4`);
        }
      );
    });
  }
};
