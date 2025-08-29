FROM node:22-alpine

WORKDIR /fittrack

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]