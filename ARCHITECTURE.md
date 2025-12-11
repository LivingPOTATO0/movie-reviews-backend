# 🎬 PHASE 3 BACKEND ARCHITECTURE SUMMARY

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    MOVIEMANIA BACKEND                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐          ┌──────────────────────────┐    │
│  │   CLIENT SIDE    │          │    EXPRESS SERVER        │    │
│  │  (React/Axios)   │◄────────►│   (index.js)             │    │
│  └──────────────────┘    HTTP  │ :5000                    │    │
│                          JSON  └──────────────────────────┘    │
│                                         ▲                       │
│                                         │                       │
│                          ┌──────────────┴────────────────┐     │
│                          │    MIDDLEWARE STACK            │     │
│                          ├─────────────────────────────────┤    │
│                          │ • CORS                          │    │
│                          │ • Body Parser                   │    │
│                          │ • Request Logging              │    │
│                          │ • Error Handler                │    │
│                          └──────────────┬─────────────────┘    │
│                                         │                       │
│                    ┌────────────────────┼────────────────────┐  │
│                    │                    │                    │  │
│                    ▼                    ▼                    ▼  │
│        ┌─────────────────────┐  ┌─────────────────────┐       │
│        │  MOVIE ROUTES       │  │  REVIEW ROUTES      │       │
│        ├─────────────────────┤  ├─────────────────────┤       │
│        │ GET    /api/movies  │  │ POST   /api/reviews │       │
│        │ GET    /search      │  │ GET    /api/reviews │       │
│        │ GET    /:id         │  │ GET    /movie       │       │
│        │ POST   /            │  │ GET    /:id         │       │
│        │ PUT    /:id         │  └─────────────────────┘       │
│        │ DELETE /:id         │                                │
│        └──────────┬──────────┘                                │
│                   │                                           │
│                   ▼                                           │
│        ┌─────────────────────┐  ┌─────────────────────┐       │
│        │ MOVIE CONTROLLER    │  │ REVIEW CONTROLLER   │       │
│        ├─────────────────────┤  ├─────────────────────┤       │
│        │ • Validation        │  │ • Validation        │       │
│        │ • Input Sanitize    │  │ • Email Check       │       │
│        │ • Error Handling    │  │ • Rating Check      │       │
│        └──────────┬──────────┘  └──────────┬──────────┘       │
│                   │                        │                  │
│                   ▼                        ▼                  │
│        ┌─────────────────────┐  ┌─────────────────────┐       │
│        │   MOVIE MODEL       │  │   REVIEW MODEL      │       │
│        ├─────────────────────┤  ├─────────────────────┤       │
│        │ • getAllMovies()    │  │ • getAllReviews()   │       │
│        │ • getMovieById()    │  │ • createReview()    │       │
│        │ • createMovie()     │  │ • getReviewsBy      │       │
│        │ • updateMovie()     │  │   MovieTitle()      │       │
│        │ • deleteMovie()     │  │ • getReviewById()   │       │
│        │ • searchMovies()    │  └──────────┬──────────┘       │
│        └──────────┬──────────┘             │                  │
│                   │                        │                  │
│                   └────────────┬───────────┘                  │
│                                │                               │
│                                ▼                               │
│                     ┌───────────────────────┐                 │
│                     │   MYSQL DATABASE      │                 │
│                     │  (moviemania_db)      │                 │
│                     ├───────────────────────┤                 │
│                     │ movies  (5 records)   │                 │
│                     │ reviews (optional)    │                 │
│                     └───────────────────────┘                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 REQUEST/RESPONSE FLOW

### **Example: Create Movie**

```
1. CLIENT REQUEST
   ┌──────────────────────────┐
   │ POST /api/movies         │
   │ {                        │
   │   "title": "Inception",  │
   │   "genre": "Sci-Fi",     │
   │   ...                    │
   │ }                        │
   └────────────┬─────────────┘
                │ HTTP
                ▼
   ┌──────────────────────────┐
   │ MIDDLEWARE               │
   │ • Parse JSON             │
   │ • Log request            │
   └────────────┬─────────────┘
                │
                ▼
   ┌──────────────────────────┐
   │ MOVIE CONTROLLER         │
   │ createMovie()            │
   │ • Validate fields        │
   │ • Sanitize inputs        │
   │ • Check constraints      │
   └────────────┬─────────────┘
                │
                ▼
   ┌──────────────────────────┐
   │ MOVIE MODEL              │
   │ createMovie()            │
   │ • Build INSERT query     │
   │ • Execute query          │
   └────────────┬─────────────┘
                │
                ▼
   ┌──────────────────────────┐
   │ MYSQL DATABASE           │
   │ INSERT INTO movies...    │
   │ ✅ Success (id: 6)       │
   └────────────┬─────────────┘
                │
                ▼
   ┌──────────────────────────┐
   │ RESPONSE (201 Created)   │
   │ {                        │
   │   "success": true,       │
   │   "data": {...},         │
   │   "message": "Created"   │
   │ }                        │
   └──────────────────────────┘
```

---

## 📦 REQUEST/RESPONSE EXAMPLES

### **GET /api/movies (Fetch All)**

```
REQUEST:
  GET http://localhost:5000/api/movies
  
RESPONSE (200 OK):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "genre": "Drama",
      "rating": 9.3,
      ...
    },
    ...
  ],
  "message": "Movies fetched successfully"
}
```

### **POST /api/reviews (Submit Review)**

```
REQUEST:
  POST http://localhost:5000/api/reviews
  Content-Type: application/json
  
  {
    "user_name": "John Doe",
    "email": "john@example.com",
    "movie_title": "Inception",
    "rating": 9,
    "review_text": "Amazing movie!"
  }
  
RESPONSE (201 Created):
{
  "success": true,
  "data": {
    "id": 1,
    "user_name": "John Doe",
    "email": "john@example.com",
    "movie_title": "Inception",
    "rating": 9,
    "review_text": "Amazing movie!"
  },
  "message": "Review submitted successfully"
}
```

### **PUT /api/movies/1 (Update Movie)**

```
REQUEST:
  PUT http://localhost:5000/api/movies/1
  Content-Type: application/json
  
  {
    "rating": 9.5,
    "description": "Updated description"
  }
  
RESPONSE (200 OK):
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Shawshank Redemption",
    "rating": 9.5,
    "description": "Updated description"
  },
  "message": "Movie updated successfully"
}
```

### **DELETE /api/movies/6 (Delete Movie)**

```
REQUEST:
  DELETE http://localhost:5000/api/movies/6
  
RESPONSE (200 OK):
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

### **Error Response**

```
REQUEST:
  POST http://localhost:5000/api/reviews
  {
    "user_name": "John",
    "email": "invalid-email",
    "movie_title": "Inception",
    "rating": 15
  }
  
RESPONSE (400 Bad Request):
{
  "success": false,
  "message": "Rating must be a number between 1 and 10"
}
```

---

## 🔐 SECURITY FEATURES

✅ **Input Validation**
- All fields validated before database operations
- Type checking for numeric fields
- Email format validation using regex

✅ **Input Sanitization**
- Whitespace trimmed
- Special characters escaped
- Case-insensitive searches

✅ **SQL Safety**
- Parameterized queries (no string concatenation)
- Prevention against SQL injection

✅ **Error Handling**
- Try-catch blocks in all async operations
- User-friendly error messages
- Detailed logging in development mode

✅ **CORS Protection**
- Cross-origin requests controlled
- Only frontend domain can access APIs

---

## 🎯 VALIDATION RULES SUMMARY

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| **Movie Title** | String | Yes | Non-empty |
| **Genre** | String | Yes | Non-empty |
| **Description** | Text | Yes | Non-empty |
| **Poster URL** | String | Yes | Non-empty |
| **Rating** | Decimal | No | 0-10 range |
| **User Name** | String | Yes | Non-empty |
| **Email** | String | Yes | Valid email format |
| **Review Rating** | Integer | Yes | 1-10 range |
| **Review Text** | Text | No | Optional |

---

## 🚀 PERFORMANCE OPTIMIZATIONS

✅ **Connection Pooling**
- MySQL connection pool (10 connections)
- Reuses connections for better performance

✅ **Async Operations**
- Non-blocking database queries
- Concurrent request handling

✅ **Error Recovery**
- Automatic connection retry logic
- Graceful error responses

---

## 📊 DATABASE SCHEMA (Quick Reference)

### **movies table**
```sql
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  poster_url VARCHAR(255) NOT NULL,
  rating DECIMAL(3,1) DEFAULT 0.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **reviews table**
```sql
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  movie_title VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 10),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ✅ PHASE 3 COMPLETION CHECKLIST

- [x] Backend project initialized with npm
- [x] All required packages installed
- [x] .env file with configuration
- [x] Database connection setup (config/db.js)
- [x] Movie model with CRUD methods
- [x] Review model with CRUD methods
- [x] Movie controller with validation
- [x] Review controller with validation
- [x] Movie routes (6 endpoints)
- [x] Review routes (4 endpoints)
- [x] Express server with middleware
- [x] Error handling implemented
- [x] CORS enabled
- [x] Health check endpoint
- [x] Request logging
- [x] API documentation created
- [x] Backend running on port 5000
- [x] Database connected successfully

**Status: ✅ COMPLETE AND TESTED**

---

