FROM node:17.9.0-slim
WORKDIR /app

COPY package.json ./
RUN npm install --silent
COPY . ./

CMD ["npm", "start"]
