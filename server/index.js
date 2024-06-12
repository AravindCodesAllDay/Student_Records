const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const app = express();

app.use(cors());

dotenv.config()

app.use(express.json({ limit: '50mb' }));

// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');

const PORT = process.env.PORT;
const CONNECTION = process.env.CONNECTION;

if (!CONNECTION) {
    console.error("Connection string is not provided.");
    process.exit(1);
}
app.use((err, req, res, next) => {
    console.error(err.message);

    if (err instanceof mongoose.Error.ValidationError) {
        return res
            .status(400)
            .json({ message: "Validation Error", error: err.errors });
    }

    if (err instanceof mongoose.Error.CastError) {
        return res.status(404).json({ message: "Resource not found" });
    }

    res.status(500).json({ message: "Internal Server Error" });
});

app.use('/student', studentRoutes);
app.use('/staff', staffRoutes);

const start = async () => {
    try {
        await mongoose.connect(CONNECTION);

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error during startup:", error);
        process.exit(1);
    }

    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log("MongoDB disconnected through app termination");
            process.exit(0);
        });
    });
};

start();