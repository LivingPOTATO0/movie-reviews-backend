const pool = require('../config/db');

class Movie {
    // Get all movies
    static async getAllMovies() {
        try {
            const connection = await pool.getConnection();
            const [movies] = await connection.query('SELECT * FROM movies ORDER BY created_at DESC');
            connection.release();
            return movies;
        } catch (error) {
            throw error;
        }
    }

    // Get movie by ID
    static async getMovieById(id) {
        try {
            const connection = await pool.getConnection();
            const [movie] = await connection.query('SELECT * FROM movies WHERE id = ?', [id]);
            connection.release();
            return movie[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Create new movie
    static async createMovie(movieData) {
        try {
            const { title, genre, description, poster_url, rating } = movieData;
            const connection = await pool.getConnection();

            const [result] = await connection.query(
                'INSERT INTO movies (title, genre, description, poster_url, rating) VALUES (?, ?, ?, ?, ?)',
                [title, genre, description, poster_url, rating || 0]
            );

            connection.release();
            return { id: result.insertId, ...movieData };
        } catch (error) {
            throw error;
        }
    }

    // Update movie
    static async updateMovie(id, movieData) {
        try {
            const connection = await pool.getConnection();

            // Build dynamic update query
            const fields = [];
            const values = [];

            if (movieData.title !== undefined) {
                fields.push('title = ?');
                values.push(movieData.title);
            }
            if (movieData.genre !== undefined) {
                fields.push('genre = ?');
                values.push(movieData.genre);
            }
            if (movieData.description !== undefined) {
                fields.push('description = ?');
                values.push(movieData.description);
            }
            if (movieData.poster_url !== undefined) {
                fields.push('poster_url = ?');
                values.push(movieData.poster_url);
            }
            if (movieData.rating !== undefined) {
                fields.push('rating = ?');
                values.push(movieData.rating);
            }

            fields.push('updated_at = CURRENT_TIMESTAMP');
            values.push(id);

            const query = `UPDATE movies SET ${fields.join(', ')} WHERE id = ?`;
            await connection.query(query, values);

            connection.release();
            return { id, ...movieData };
        } catch (error) {
            throw error;
        }
    }

    // Delete movie
    static async deleteMovie(id) {
        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query('DELETE FROM movies WHERE id = ?', [id]);
            connection.release();
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Search movies by title or genre
    static async searchMovies(query) {
        try {
            const connection = await pool.getConnection();
            const searchQuery = `%${query}%`;
            const [movies] = await connection.query(
                'SELECT * FROM movies WHERE LOWER(title) LIKE LOWER(?) OR LOWER(genre) LIKE LOWER(?) ORDER BY created_at DESC',
                [searchQuery, searchQuery]
            );
            connection.release();
            return movies;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Movie;
