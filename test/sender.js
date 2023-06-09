const messageController = require("./controllers/rabbitmqController");
const express = require("express");
const app = express();

app.post("/send", async (req, res) => {
  messageController.sendMessage("Hello, RabbitMQ!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server sender running on port ${port}`);
});
