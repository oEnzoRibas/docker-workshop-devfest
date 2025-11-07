FROM node:18-alpine

WORKDIR /usr/src/app

# Install only prod dependencies in image
COPY package*.json ./
RUN npm install --production

# Copy app sources
COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "src/app.js"]
