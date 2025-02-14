import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import cors from 'cors';
import path from 'path';
import { getMovieById } from './controllers/movieController.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON in requests
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads'))); // Serve uploaded files
// Routes
app.use('/movies', movieRoutes);

app.get('/movies/getMovieById/:id', getMovieById);  // Use the getMovieById controller for this route


app.get('/', (req, res) => {
  res.send(`<h1>Backend server is running....</h1>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
console.log("MongoDB URI:", process.env.MONGODB_URI);


