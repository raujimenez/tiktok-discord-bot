#!/bin/bash

# download node
sudo apt install nodejs
sudo apt install npm

# download python3 and pip3
sudo apt-get update
sudo apt-get install python3.6

# install tiktokdownloader service
pip3 install TikTokApi
python3 -m playwright install

# install node dependencies
npm i
node src/discord_client/client.js