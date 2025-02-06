import Movie from '../models/movieModel.js';

// Add a new movie
export const addMovie = async (req, res) => {
    try {
        const { title, rating, releaseDate, genre, director, producer, trailerUrl,description,year } = req.body;

        // Access the file name from the multer upload result (assuming you're using multer)
        const poster = req.file ? req.file.filename : null; // Get the file name from multer (e.g., "image-1734001200679-2.jpg")

        // Create a new movie document with just the file name
        const movie = new Movie({
            title,
            rating,
            releaseDate,
            genre,
            director,
            producer,
            poster, 
            trailerUrl,
            description,
            year
        });

        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding movie' });
    }
};


// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
    console.log(error);

  }

};


// Get a movie by ID
export const getMovieById = async (req, res) => {
    try {
        // Find movie by ID from the database
        const movie = await Movie.findById(req.params.id);  // req.params.id contains the movie ID from the URL
        if (!movie) {
            // If no movie found with that ID, return a 404 response
            return res.status(404).json({ message: 'Movie not found' });
        }
        // Return the movie details as the response
        res.json(movie);
    } catch (error) {
        // If there's an error, return a 500 status with the error message
        res.status(500).json({ message: 'Error fetching movie', error });
    }
};


// Update a movie by ID
export const updateMovie = async (req, res) => {
    const { id } = req.params; // Get movie ID from URL params
    const { title, rating, releaseDate, genre, director, producer, trailerUrl,description,year } = req.body;
    
    // Get the poster file from the request (if any), else use the existing one
    const updatedPoster = req.file ? req.file.filename : req.body.poster;

    try {
        // Find the movie by ID and update the details
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            {
                title,
                rating,
                releaseDate,
                genre,
                director,
                producer,
                trailerUrl,
                poster: updatedPoster,  // Update the poster if a new file is uploaded
                description,
                year
            },
            { new: true } // Return the updated movie document
        );

        if (!updatedMovie) {
            return res.status(404).send({ message: 'Movie not found' });
        }

        // Return success response with updated movie
        res.status(200).send({ message: 'Movie updated successfully', updatedMovie });
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
};



// Delete a movie by ID
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
};
