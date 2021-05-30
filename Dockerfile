FROM node:12

USER root
WORKDIR /home/app

COPY ./package.json /home/app/package.json

RUN npm -g config set user root
RUN npm i -g tiktok-scraper
RUN npm i
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
EXPOSE 80
CMD [ "node", "src/discord_client/client.js" ]