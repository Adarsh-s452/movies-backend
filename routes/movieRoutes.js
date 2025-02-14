import express from 'express';
import uploadFields from '../middleware/multerMiddleware.js';
import { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController.js';

const router = express.Router();

// Routes
router.post('/addmovies', uploadFields,addMovie); // Add movie (with file upload)
router.get('/getallmovies', getMovies); // Get all movies
router.get('/getmoviesbyid/:id', getMovieById);  // Get movie by ID (this is the route to fetch movie details by ID)
router.put('/update/:id', uploadFields, updateMovie); // Update movie (with file upload)
router.delete('/delete/:id', deleteMovie); // Delete movie


export default router;
