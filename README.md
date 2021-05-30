# tiktok-discord-bot
This program will download a tiktok given the mobile version of the website and will reply to a discord message with the video file.

## Important environment setup
- Create a new .env file based off of template.env
- Insert the Discord API token into the .env file
- follows the format ``https://vm.tiktok.com/\w*``

## Run the application using docker
```
docker build . -t tiktok-downloader-discord-bot:latest
docker run -p 80:80 tiktok-downloader-discord-bot
```
