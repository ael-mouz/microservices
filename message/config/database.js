const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 15000,
    });

    const db = mongoose.connection;

    db.on("error", (err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

    db.on("disconnected", () => {
        console.warn("Database disconnected");
    });

    db.on("reconnected", () => {
        console.log("Database reconnected");
    });

    db.once("open", () => {
        console.log("Successfully connected to database");
    });
};