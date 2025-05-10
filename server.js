const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const leadFormRoutes = require('./routes/leadForm.routes');
const careerFormRoutes = require('./routes/careerFormRoutes');
const contactRoutes = require('./routes/contactFormRoutes');

// Load environment variables
dotenv.config();

const app = express();

// === CORS CONFIG FOR LOCAL FRONTEND ===
const corsOptions = {
  origin: 'http://localhost:3000', // your frontend URL during local dev
  methods: ['GET', 'POST'],
  credentials: true
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/lead-form', leadFormRoutes);
app.use('/api/careerForm', careerFormRoutes);
app.use('/api/contact', contactRoutes);

// Fallback route
app.get('/', (req, res) => {
  res.send('Diksha Backend is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
