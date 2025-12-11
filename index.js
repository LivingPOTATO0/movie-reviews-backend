const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import database connection
const pool = require('./config/db');

// Import routes
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'MovieMania Backend API',
        version: '1.0.0',
        endpoints: {
            movies: '/api/movies',
            reviews: '/api/reviews',
            health: '/api/health'
        }
    });
});

// 404 Not Found handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║     🎬 MovieMania Backend Server       ║
╚════════════════════════════════════════╝
  
  Server running on: http://localhost:${PORT}
  Environment: ${process.env.NODE_ENV}
  Database: ${process.env.DB_NAME}
  
  Available Endpoints:
  📺 GET    /api/movies              - Get all movies
  🔍 GET    /api/movies/search       - Search movies
  📖 GET    /api/movies/:id          - Get movie by ID
  ✏️  POST   /api/movies              - Create movie
  📝 PUT    /api/movies/:id          - Update movie
  🗑️  DELETE /api/movies/:id          - Delete movie
  📝 POST   /api/reviews             - Submit review
  📋 GET    /api/reviews             - Get all reviews
  ❤️  GET    /api/reviews/movie?... - Get reviews by movie
  
  Ready to serve requests! 🚀
  `);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n📴 Shutting down server gracefully...');
    pool.end(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});
