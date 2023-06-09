const messageController = require("./controllers/rabbitmqController");
const express = require("express");
const app = express();

app.get("/receive", async (req, res) => {
  messageController.receiveMessage();
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server receiver running on port ${port}`);
});
