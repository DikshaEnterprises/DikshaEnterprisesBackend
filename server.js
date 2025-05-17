const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const leadFormRoutes = require('./routes/leadForm.routes');
const careerFormRoutes = require('./routes/careerFormRoutes');
const contactRoutes = require('./routes/contactFormRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const getApplicationRoutes = require('./routes/applicationRoutes');
const referralRoutes = require('./routes/referralRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const referralClaim = require("./routes/referralClaim");
// Load environment variables
dotenv.config();

const app = express();

// const cors = require('cors');
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'https://dikshaenterprises.ltd','http://diksha-enterprises-portal.s3-website.ap-south-1.amazonaws.com/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/lead-form', leadFormRoutes);
app.use('/api/careerForm', careerFormRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api', getApplicationRoutes);
app.use('/api', referralRoutes);
app.use("/api/referrals", referralClaim);

// app.use('/api', applicationRoutes);
// Fallback route
app.get('/', (req, res) => {
  res.send('Diksha Backend is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
