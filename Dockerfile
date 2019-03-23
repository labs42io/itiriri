FROM node:10.15.0-jessie

WORKDIR /usr/src/app/
COPY . /usr/src/app/

RUN npm install
RUN npm install -g gulp
