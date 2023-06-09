const amqp = require("amqplib");

const sendMessage = async (message) => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "my_exchange";
  const queue = "my_queue";
  const key = "my_key";

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, key);

  channel.sendToQueue(queue, Buffer.from(message));

  console.log("Message sent:", message);

  await channel.close();
  await connection.close();
};


const receiveMessage = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "my_exchange";
  const queue = "my_queue";
  const key = "my_key";

  await channel.assertExchange(exchange, "direct", { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, key);

  console.log("Waiting for messages...");

  channel.consume(queue, (message) => {
    console.log("Received message:", message.content.toString());

    channel.ack(message);
  });
};

module.exports = { sendMessage, receiveMessage };
