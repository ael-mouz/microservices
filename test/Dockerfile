# Specify the base image for your Node.js app
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Install RabbitMQ
RUN apt-get update && \
    apt-get install -y rabbitmq-server && \
    rm -rf /var/lib/apt/lists/*

# Run the RabbitMQ service
CMD service rabbitmq-server start && \
    npm run receiver && \
    npm run sender
