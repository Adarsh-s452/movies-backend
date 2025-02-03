import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  poster: { type: String, required: true },
  trailerUrl: { type: String, required: true },
  description: { type: String, required: true },
  year:{ type: String, required: true}
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
