FROM node:20.10-alpine

LABEL maintainer="Gabriel Victor <gabrielvictorweb@gmail.com>"

LABEL description="This Dockerfile installs node"

# Create app directory
WORKDIR /api

# Bundle files
COPY ./api .

#Update npm 
RUN npm install -g npm@latest

# Install dependencies
RUN npm install
RUN npm install --save-dev

# Expose port 8000
EXPOSE 8000