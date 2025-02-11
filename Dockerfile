FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
