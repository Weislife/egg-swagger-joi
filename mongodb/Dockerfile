FROM mongo:latest

RUN mkdir -p /data/logs/ \
    && cd /data/logs \
    && touch mongodb.log

#init db
COPY ./init.js /docker-entrypoint-initdb.d/