import express from 'express';
import multerConfig from '../middleware/multerMiddleware.js';
import { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController.js';

const router = express.Router();

// Routes
router.post('/addmovies', multerConfig.single('poster'),addMovie); // Add movie (with file upload)
router.get('/getallmovies', getMovies); // Get all movies
router.get('/getmoviesbyid/:id', getMovieById);  // Get movie by ID (this is the route to fetch movie details by ID)
router.put('/update/:id', multerConfig.single('poster'), updateMovie); // Update movie (with file upload)
router.delete('/delete/:id', deleteMovie); // Delete movie
// router.post('/addproduct',jwtMiddleware,dealeradmin,multerConfig.single('productImage'),productController.addproduct)


export default router;
