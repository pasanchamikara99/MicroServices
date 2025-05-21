FROM node:23.11.1-alpine3.21

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]
