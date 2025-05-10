const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const leadFormRoutes = require('./routes/leadForm.routes');
const careerFormRoutes = require('./routes/careerFormRoutes');
const contactRoutes = require("./routes/contactFormRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',                 // For local development
  'https://dikshaenterprises.ltd'       // Replace with actual deployed frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));

// Connect to DB
connectDB();

// Routes
app.use('/api/lead-form', leadFormRoutes);
app.use('/api/careerForm', careerFormRoutes);
app.use("/api/contact", contactRoutes);

// Fallback
app.get('/', (req, res) => {
  res.send('Diksha Backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
