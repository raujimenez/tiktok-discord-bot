#!/bin/bash

# download node
sudo yum install -y gcc-c++ make -y
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash - 
sudo yum install -y nodejs -y 

# download python3 and pip3
sudo yum install python34 python34-pip -y

# install tiktokdownloader service
pip3 install TikTokApi
python3 -m playwright install

# install node dependencies
npm i
node src/discord_client/client.js