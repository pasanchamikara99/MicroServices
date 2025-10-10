FROM node:24.10.0-alpine3.22

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
