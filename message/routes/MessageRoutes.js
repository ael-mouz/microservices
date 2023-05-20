const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const messageController = require("../controllers/MessageController");

router.post("/messages", auth, messageController.createMessage);
router.get("/messages", auth, messageController.getAllMessages);
router.get("/messages/:id", auth, messageController.getMessageById);
router.put("/messages/:id", auth, messageController.updateMessage);
router.put("/messages/:id/viewed", messageController.updateViewedStatus);
router.delete("/messages/:id", auth, messageController.deleteMessage);

module.exports = router;
