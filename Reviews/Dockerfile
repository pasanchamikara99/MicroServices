FROM node:alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]
