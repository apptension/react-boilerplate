FROM node:9-alpine
RUN mkdir /webapp/ && \
    apk add --update --no-cache zlib-dev libpng-dev
WORKDIR /webapp
COPY package.json .eslintrc yarn.lock /webapp/
COPY internals/ /webapp/internals/
COPY app/images /webapp/app/images
RUN  apk add --update --no-cache --virtual .build-deps make bash g++ && \
     yarn install && \
     apk del .build-deps
COPY .babelrc .editorconfig plopfile.js /webapp/
COPY  server/ /webapp/server/
COPY app/ /webapp/app/
RUN yarn build
CMD ["yarn", "run", "start:prod"]