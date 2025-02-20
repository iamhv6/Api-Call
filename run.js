const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "main"))); // Serve frontend files, to run the files in main folder

// API Fetching Route
app.get("/api/fetch", async (req, res) => {
    const apiUrl = req.query.url;

    if (!apiUrl) {
        return res.status(400).json({ error: "API URL is required!" });
    }

    try {
        const response = await axios.get(apiUrl);
        res.json({ status: "success", data: response.data });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch API data",
            details: error.message
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

