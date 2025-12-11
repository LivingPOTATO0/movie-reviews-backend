const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

// Get all reviews
router.get('/', ReviewController.getAllReviews);

// Get reviews by movie title
router.get('/movie', ReviewController.getReviewsByMovieTitle);

// Get review by ID
router.get('/:id', ReviewController.getReviewById);

// Create new review
router.post('/', ReviewController.createReview);

module.exports = router;
