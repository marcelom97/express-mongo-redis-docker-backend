FROM node:current-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY scripts/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ]