#!/bin/bash

# install needed dependencies 
sudo apt-get install libgtk-3-0\
          libcairo2\
          libegl1\
          libnotify4\
          libgdk-pixbuf2.0-0\
          libopus0\
          libpango-1.0-0\
          libharfbuzz0b\
          libwoff1\
          libharfbuzz-icu0\
          gstreamer1.0-plugins-base\
          libgstreamer-gl1.0-0\
          gstreamer1.0-plugins-bad\
          libjpeg-turbo8\
          libopenjp2-7\
          libwebpdemux2\
          libwebp6\
          libatk1.0-0\
          libenchant1c2a\
          libsecret-1-0\
          libhyphen0\
          libxdamage1\
          libwayland-server0\
          libwayland-egl1\
          libxkbcommon0\
          libepoxy0\
          libevdev2\
          libatk-bridge2.0-0\
          libgles2\
          gstreamer1.0-libav -y

# download node
sudo apt install nodejs -y
sudo apt install npm -y

# download python3 and pip3
sudo apt-get install python3.6 python3-pip -y

# install tiktokdownloader service
pip3 install TikTokApi
pip3 install requests
python3 -m playwright install

# install node dependencies
npm i
node src/discord_client/client.js