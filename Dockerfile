FROM node:lts AS runtime
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run astro preferences disable devToolbar

ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
CMD npm start -- --host $HOST --port $PORT
