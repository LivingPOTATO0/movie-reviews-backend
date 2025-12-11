const pool = require('../config/db');

class Review {
    // Get all reviews
    static async getAllReviews() {
        try {
            const connection = await pool.getConnection();
            const [reviews] = await connection.query('SELECT * FROM reviews ORDER BY created_at DESC');
            connection.release();
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    // Get reviews by movie title
    static async getReviewsByMovieTitle(movieTitle) {
        try {
            const connection = await pool.getConnection();
            const [reviews] = await connection.query(
                'SELECT * FROM reviews WHERE LOWER(movie_title) LIKE LOWER(?) ORDER BY created_at DESC',
                [`%${movieTitle}%`]
            );
            connection.release();
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    // Create new review
    static async createReview(reviewData) {
        try {
            const { user_name, email, movie_title, rating, review_text } = reviewData;
            const connection = await pool.getConnection();

            const [result] = await connection.query(
                'INSERT INTO reviews (user_name, email, movie_title, rating, review_text) VALUES (?, ?, ?, ?, ?)',
                [user_name, email, movie_title, rating, review_text || null]
            );

            connection.release();
            return { id: result.insertId, ...reviewData };
        } catch (error) {
            throw error;
        }
    }

    // Get review by ID
    static async getReviewById(id) {
        try {
            const connection = await pool.getConnection();
            const [review] = await connection.query('SELECT * FROM reviews WHERE id = ?', [id]);
            connection.release();
            return review[0] || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Review;
