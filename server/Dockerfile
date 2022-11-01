FROM node:16-alpine

# RUN mkdir src

WORKDIR /src

COPY . /src/

RUN rm -rf node_modules

RUN npm install

CMD ["node","index.js"]