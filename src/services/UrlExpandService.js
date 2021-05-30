const tall = require('tall');

module.exports = class UrlExpandService {
    constructor() {}

    async expandUrl (url) {
        let expandedUrl = await tall.tall(url);
        return expandedUrl;
    }
}