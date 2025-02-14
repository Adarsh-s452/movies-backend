import Movie from '../models/movieModel.js';

// Add a new movie
export const addMovie = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files); 

        const { title, rating, releaseDate, genre, director, producer, trailerUrl, description, year, cast } = req.body;

        if (!req.files || !req.files["poster"]) {
            return res.status(400).json({ message: "Poster file is required" });
        }

        const poster = req.files["poster"] ? req.files["poster"][0].filename : null;

        const castArray = cast ? JSON.parse(cast).map((actor, index) => ({
            name: actor.name,
            image: req.files["castImages"] ? req.files["castImages"][index]?.filename : null
        })) : [];

        if (!title || !rating || !releaseDate || !genre || !director || !producer || !poster || !trailerUrl || !description || !year || castArray.length === 0) {
            return res.status(400).json({ message: "All fields are required, including cast details." });
        }

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
            year,
            cast: castArray
        });

        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        console.error("Error adding movie:", error);
        res.status(500).json({ message: "Server Error" });
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
        const movie = await Movie.findById(req.params.id);  // req.params.id contains the movie ID from the URL
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie', error });
    }
};
// Update a movie by ID
export const updateMovie = async (req, res) => {
    const { id } = req.params; 
    const { title, rating, releaseDate, genre, director, producer, trailerUrl,description,year } = req.body;
    
    const updatedPoster = req.file ? req.file.filename : req.body.poster;

    try {
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
                poster: updatedPoster,  
                description,
                year
            },
            { new: true } 
        );

        if (!updatedMovie) {
            return res.status(404).send({ message: 'Movie not found' });
        }

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
