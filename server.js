const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const leadFormRoutes = require('./routes/leadForm.routes');
const careerFormRoutes = require('./routes/careerFormRoutes');
// const contactFormRoutes = require('./routes/contactFormRoutes'); // <-- NEW
const contactRoutes = require("./routes/contactFormRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/lead-form', leadFormRoutes);
app.use('/api/careerForm', careerFormRoutes);
// app.use('/api/contact', contactFormRoutes);
app.use("/api/contact", contactRoutes);
// Fallback
app.get('/', (req, res) => {
  res.send('Diksha Backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
