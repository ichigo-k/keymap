FROM node:alpine
WORKDIR /app
COPY package* ./
ARG NODE_ENV
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm","run","dev"]