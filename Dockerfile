FROM node:8.11.3-alpine

ENV current_run_env=default

ENV TIME_ZONE=Asia/Shanghai

RUN \
  mkdir -p /usr/src/app \
  && apk add --no-cache tzdata \
  && echo "${TIME_ZONE}" > /etc/timezone \ 
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime 

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

# RUN npm i --registry=https://registry.npm.taobao.org --production
RUN npm i --production

COPY . /usr/src/app

EXPOSE 7113

CMD npm run start_${current_run_env}
