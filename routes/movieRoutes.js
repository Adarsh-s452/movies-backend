import express from 'express';
import multer from 'multer';
import { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store uploaded files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/addmovies', upload.single('poster'), addMovie); // Add movie (with file upload)
router.get('/getallmovies', getMovies); // Get all movies
router.get('/getmoviesbyid/:id', getMovieById);  // Get movie by ID (this is the route to fetch movie details by ID)
router.put('/update/:id', upload.single('poster'), updateMovie); // Update movie (with file upload)
router.delete('/delete/:id', deleteMovie); // Delete movie

export default router;
