FROM node:22.9.0-alpine

LABEL maintainer="Gabriel Victor <gabrielvictorweb@gmail.com>"

LABEL description="This Dockerfile installs node"

# Create app directory
WORKDIR /api

# Bundle files
COPY ./api .

#Update npm 
RUN npm install -g npm@10.8.3

# Install dependencies
RUN npm i

# Expose port 8000
EXPOSE 8000