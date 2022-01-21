FROM mcr.microsoft.com/playwright:focal

USER root
WORKDIR /home/app

COPY ./package.json /home/app/package.json

# Install dependencies 

RUN npm -g config set user root
RUN npm i
# If you are building your code for production
# RUN npm ci --only=production

# install python
RUN pip3 install TikTokApi
RUN pip3 install --upgrade requests
RUN pip3 install typing
RUN python3 -m playwright install

# Bundle app source
COPY . .

EXPOSE 8080
EXPOSE 80
CMD [ "node", "src/discord_client/client.js" ]