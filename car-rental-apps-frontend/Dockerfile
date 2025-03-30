# Dockerfile for Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app
RUN npm install --only=production

ENV PORT=3000

EXPOSE ${PORT}

CMD ["npm", "run", "start"]