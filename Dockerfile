FROM node:12
# create app dir
WORKDIR /usr/src/bot

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]