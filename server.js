// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// 1) CORS: allow everything (in prod, replace '*' with your frontend URL)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 2) JSON body parser
app.use(express.json());

// 3) Connect to your Mongo (or whatever) database
connectDB();

// 4) Mount routes
app.use("/api/lead-form", require("./routes/leadForm.routes"));
app.use("/api/careerForm", require("./routes/careerFormRoutes"));
app.use("/api/contact", require("./routes/contactFormRoutes"));

// 5) Health-check
app.get("/", (req, res) => {
  res.send("Diksha Backend is running...");
});

// 6) Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
