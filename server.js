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

// 1) Configure CORS (allow all or specify your frontend domain)
app.use(cors({
  origin: '*',              // Change '*' to your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,        // Enable cookies if needed
}));

// 2) Handle preflight requests for all routes
app.options('*', cors());

// 3) Body parser middleware
app.use(express.json());

// 4) Connect to database
connectDB();

// 5) Route handlers
app.use('/api/lead-form', leadFormRoutes);
app.use('/api/careerForm', careerFormRoutes);
app.use('/api/contact', contactRoutes);

// 6) Health-check / fallback
app.get('/', (req, res) => {
  res.send('Diksha Backend is running...');
});

// 7) Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
