FROM node:22.9.0-alpine

WORKDIR /gui 

LABEL maintainer="Gabriel Victor <gabrielvictorweb@gmail.com>"

LABEL description="This Dockerfile installs node"

COPY ./frontend .

RUN npm install

EXPOSE 5173