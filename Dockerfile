FROM node:17.0.1-slim
WORKDIR /app

COPY package.json ./
RUN npm install --silent
COPY . ./

CMD ["npm", "start"]
