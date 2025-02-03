import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import cors from 'cors'

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Middleware
app.use(cors())
app.use(express.json()); // To parse JSON in requests
app.use(express.static('uploads')); // Serve static files from the 'uploads' folder


// Routes
app.use('/movies', movieRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/',(req,res)=>{
  res.send(`<h1>Backend server is running....</h1>`)
})