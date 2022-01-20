#!/bin/bash

# download node
sudo yum install nodejs npm --enablerepo=epel

# download python3 and pip3
sudo yum install python34 python34-pip -y

# install tiktokdownloader service
pip3 install TikTokApi
python3 -m playwright install

# install node dependencies
npm i
node src/discord_client/client.js