const Review = require('../models/Review');

class ReviewController {
    // GET all reviews
    static async getAllReviews(req, res) {
        try {
            const reviews = await Review.getAllReviews();
            res.status(200).json({
                success: true,
                data: reviews,
                message: 'Reviews fetched successfully'
            });
        } catch (error) {
            console.error('Error fetching reviews:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error fetching reviews',
                error: error.message
            });
        }
    }

    // POST create new review
    static async createReview(req, res) {
        try {
            const { user_name, email, movie_title, rating, review_text } = req.body;

            // Input validation
            if (!user_name || !email || !movie_title || rating === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: user_name, email, movie_title, rating'
                });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }

            // Validate rating
            if (isNaN(rating) || rating < 1 || rating > 10) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be a number between 1 and 10'
                });
            }

            // Sanitize inputs
            const sanitizedData = {
                user_name: user_name.trim(),
                email: email.trim().toLowerCase(),
                movie_title: movie_title.trim(),
                rating: parseInt(rating),
                review_text: review_text ? review_text.trim() : null
            };

            const newReview = await Review.createReview(sanitizedData);

            res.status(201).json({
                success: true,
                data: newReview,
                message: 'Review submitted successfully'
            });
        } catch (error) {
            console.error('Error creating review:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error submitting review',
                error: error.message
            });
        }
    }

    // GET reviews by movie title
    static async getReviewsByMovieTitle(req, res) {
        try {
            const { movieTitle } = req.query;

            if (!movieTitle || movieTitle.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Movie title is required'
                });
            }

            const reviews = await Review.getReviewsByMovieTitle(movieTitle);

            res.status(200).json({
                success: true,
                data: reviews,
                message: `Found ${reviews.length} review(s) for "${movieTitle}"`
            });
        } catch (error) {
            console.error('Error fetching reviews:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error fetching reviews',
                error: error.message
            });
        }
    }

    // GET review by ID
    static async getReviewById(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid review ID'
                });
            }

            const review = await Review.getReviewById(id);

            if (!review) {
                return res.status(404).json({
                    success: false,
                    message: 'Review not found'
                });
            }

            res.status(200).json({
                success: true,
                data: review,
                message: 'Review fetched successfully'
            });
        } catch (error) {
            console.error('Error fetching review:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error fetching review',
                error: error.message
            });
        }
    }
}

module.exports = ReviewController;
