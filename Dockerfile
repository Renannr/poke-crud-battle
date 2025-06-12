FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm config set registry https://registry.npmmirror.com
RUN npm install

COPY . .

RUN npx prisma generate

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 3333
CMD ["npm", "run", "dev"]
