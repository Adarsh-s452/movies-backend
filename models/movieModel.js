import mongoose from 'mongoose';

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false }
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  releaseDate: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  poster: { type: String, required: true },
  trailerUrl: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
  cast: [castSchema] 
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
