const Movie = require('../models/Movie');

class MovieController {
    // GET all movies
    static async getAllMovies(req, res) {
        try {
            const movies = await Movie.getAllMovies();
            res.status(200).json({
                success: true,
                data: movies,
                message: 'Movies fetched successfully'
            });
        } catch (error) {
            console.error('Error fetching movies:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error fetching movies',
                error: error.message
            });
        }
    }

    // GET movie by ID
    static async getMovieById(req, res) {
        try {
            const { id } = req.params;

            // Validate ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid movie ID'
                });
            }

            const movie = await Movie.getMovieById(id);

            if (!movie) {
                return res.status(404).json({
                    success: false,
                    message: 'Movie not found'
                });
            }

            res.status(200).json({
                success: true,
                data: movie,
                message: 'Movie fetched successfully'
            });
        } catch (error) {
            console.error('Error fetching movie:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error fetching movie',
                error: error.message
            });
        }
    }

    // POST create new movie
    static async createMovie(req, res) {
        try {
            const { title, genre, description, poster_url, rating } = req.body;

            // Input validation
            if (!title || !genre || !description || !poster_url) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: title, genre, description, poster_url'
                });
            }

            // Validate rating if provided
            if (rating && (isNaN(rating) || rating < 0 || rating > 10)) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be a number between 0 and 10'
                });
            }

            // Sanitize inputs
            const sanitizedData = {
                title: title.trim(),
                genre: genre.trim(),
                description: description.trim(),
                poster_url: poster_url.trim(),
                rating: rating ? parseFloat(rating) : 0
            };

            const newMovie = await Movie.createMovie(sanitizedData);

            res.status(201).json({
                success: true,
                data: newMovie,
                message: 'Movie created successfully'
            });
        } catch (error) {
            console.error('Error creating movie:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error creating movie',
                error: error.message
            });
        }
    }

    // PUT update movie
    static async updateMovie(req, res) {
        try {
            const { id } = req.params;
            const { title, genre, description, poster_url, rating } = req.body;

            // Validate ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid movie ID'
                });
            }

            // Check if at least one field is provided
            if (!title && !genre && !description && !poster_url && rating === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'At least one field must be provided for update'
                });
            }

            // Check if movie exists
            const existingMovie = await Movie.getMovieById(id);
            if (!existingMovie) {
                return res.status(404).json({
                    success: false,
                    message: 'Movie not found'
                });
            }

            // Validate rating if provided
            if (rating && (isNaN(rating) || rating < 0 || rating > 10)) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be a number between 0 and 10'
                });
            }

            // Sanitize inputs
            const updateData = {};
            if (title) updateData.title = title.trim();
            if (genre) updateData.genre = genre.trim();
            if (description) updateData.description = description.trim();
            if (poster_url) updateData.poster_url = poster_url.trim();
            if (rating !== undefined) updateData.rating = parseFloat(rating);

            const updatedMovie = await Movie.updateMovie(id, updateData);

            res.status(200).json({
                success: true,
                data: updatedMovie,
                message: 'Movie updated successfully'
            });
        } catch (error) {
            console.error('Error updating movie:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error updating movie',
                error: error.message
            });
        }
    }

    // DELETE movie
    static async deleteMovie(req, res) {
        try {
            const { id } = req.params;

            // Validate ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid movie ID'
                });
            }

            // Check if movie exists
            const existingMovie = await Movie.getMovieById(id);
            if (!existingMovie) {
                return res.status(404).json({
                    success: false,
                    message: 'Movie not found'
                });
            }

            const deleted = await Movie.deleteMovie(id);

            if (deleted) {
                res.status(200).json({
                    success: true,
                    message: 'Movie deleted successfully'
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to delete movie'
                });
            }
        } catch (error) {
            console.error('Error deleting movie:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error deleting movie',
                error: error.message
            });
        }
    }

    // Search movies
    static async searchMovies(req, res) {
        try {
            const { q } = req.query;

            if (!q || q.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
            }

            const movies = await Movie.searchMovies(q);

            res.status(200).json({
                success: true,
                data: movies,
                message: `Found ${movies.length} movie(s)`
            });
        } catch (error) {
            console.error('Error searching movies:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error searching movies',
                error: error.message
            });
        }
    }
}

module.exports = MovieController;
