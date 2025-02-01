FROM node:20-alpine

MAINTAINER Backend Api-cars

RUN mkdir /app
WORKDIR /app

COPY ./backend/package*.json /app

RUN npm i