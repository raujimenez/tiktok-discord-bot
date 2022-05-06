FROM mcr.microsoft.com/playwright:focal

USER root
WORKDIR /home/app

COPY ./package.json /home/app/package.json

# Install dependencies 
RUN apt-get update -y
RUN apt-get upgrade -y
# RUN apt-get install -y python3.8 python3-pip && update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1 && update-alternatives --install /usr/bin/python python /usr/bin/python3 1 && update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1 && \
RUN apt-get update && apt-get install -y software-properties-common gcc && \
    add-apt-repository -y ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y python3.6 python3-distutils python3-pip python3-apt

RUN npm -g config set user root
RUN npm i
# If you are building your code for production
# RUN npm ci --only=production

# install python
RUN pip3 install 'TikTokApi==4.1.0'
RUN pip3 install --upgrade requests
RUN pip3 install typing
RUN python3 -m playwright install

# Bundle app source
COPY . .

EXPOSE 8080
EXPOSE 80
CMD [ "node", "src/discord_client/client.js" ]
