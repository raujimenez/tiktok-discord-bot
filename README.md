# tiktok-discord-bot
This program will download a tiktok given the mobile version of the website and will reply to a discord message with the video file.

## Important environment setup
- export token varible in bash or zsh
- Create a new .env file based off of template.env
- Insert the Discord API token into the .env file
- follows the format ``https://vm.tiktok.com/\w*`` or ``https://www.tiktok.com/:userid/:videoid``

## Run the application with node
```
# Linux install for python utility
pip3 install TikTokApi
python3 -m playwright install

# Windows install for windows utility
pip install TikTokApi
python -m playwright install

npm i
node src/discord_client/client.js
```

## Run the application using docker
```
docker build . -t tiktok-downloader-discord-bot:latest
docker run -p 80:80 tiktok-downloader-discord-bot
```
## Run with docker-compose
```
docker-compose up
```
Note: when using docker-compose it is important to set your discord bot token variable in your shell of choice and export that token. 
```
export token= 
```
