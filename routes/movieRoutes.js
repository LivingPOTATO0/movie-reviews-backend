const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

// Get all movies
router.get('/', MovieController.getAllMovies);

// Search movies by title or genre
router.get('/search', MovieController.searchMovies);

// Get movie by ID
router.get('/:id', MovieController.getMovieById);

// Create new movie
router.post('/', MovieController.createMovie);

// Update movie
router.put('/:id', MovieController.updateMovie);

// Delete movie
router.delete('/:id', MovieController.deleteMovie);

module.exports = router;
