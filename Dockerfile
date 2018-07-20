FROM node:9-alpine
ENV APPDIR /app/webapp
RUN mkdir -p ${APPDIR}
WORKDIR ${APPDIR}
RUN apk add --update --no-cache zlib-dev libpng-dev
COPY package.json ${APPDIR}
COPY yarn.lock ${APPDIR}
COPY internals/ ${APPDIR}/internals/
COPY app/images ${APPDIR}/app/images
RUN  apk add --update --no-cache --virtual .build-deps make bash g++ && \
     yarn install && \
     apk del .build-deps
COPY .babelrc plopfile.js .eslintrc ${APPDIR}/
COPY server/ ${APPDIR}/server/
COPY app/ ${APPDIR}/app/
CMD ["yarn", "run", "start:prod"]
