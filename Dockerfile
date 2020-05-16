FROM library/node as base
FROM base as dev

ENV LANG C.UTF-8

WORKDIR /app/mqtt-echoback

ADD . /app/mqtt-echoback

RUN npm install

CMD [ "npm start" ]
