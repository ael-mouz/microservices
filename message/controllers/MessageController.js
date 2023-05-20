const Message = require("../models/Message");

const createMessage = async (req, res) => {
    try {
        const { sender, recipient, content } = req.body;
        const message = new Message({ sender, recipient, content });
        const savedMessage = await message.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMessage = async (req, res) => {
    try {
        const { sender, recipient, content, viewed } = req.body;
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { sender, recipient, content, viewed },
            { new: true }
        );
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateViewedStatus = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { viewed: true },
            { new: true }
        );
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
    updateViewedStatus,
};