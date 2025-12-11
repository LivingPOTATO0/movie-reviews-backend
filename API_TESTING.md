# 🎬 MovieMania Backend API - Complete Testing Guide

## Server Status
✅ **Backend Server**: Running on `http://localhost:5000`  
✅ **Database**: Connected to `moviemania_db`  
✅ **Port**: 5000

---

## 📋 API ENDPOINTS & TESTING

### 1️⃣ **GET ALL MOVIES**

**Endpoint**: `GET /api/movies`

**curl Command**:
```bash
curl -X GET http://localhost:5000/api/movies
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "genre": "Drama",
      "description": "Two imprisoned men bond over a number of years...",
      "poster_url": "https://m.media-amazon.com/images/...",
      "rating": 9.3,
      "created_at": "2025-12-11T10:30:45.000Z",
      "updated_at": "2025-12-11T10:30:45.000Z"
    },
    ...
  ],
  "message": "Movies fetched successfully"
}
```

---

### 2️⃣ **GET MOVIE BY ID**

**Endpoint**: `GET /api/movies/:id`

**curl Command**:
```bash
curl -X GET http://localhost:5000/api/movies/1
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Shawshank Redemption",
    "genre": "Drama",
    "description": "Two imprisoned men bond over a number of years...",
    "poster_url": "https://m.media-amazon.com/images/...",
    "rating": 9.3,
    "created_at": "2025-12-11T10:30:45.000Z",
    "updated_at": "2025-12-11T10:30:45.000Z"
  },
  "message": "Movie fetched successfully"
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Movie not found"
}
```

---

### 3️⃣ **SEARCH MOVIES**

**Endpoint**: `GET /api/movies/search?q=<query>`

**curl Commands**:
```bash
# Search by title
curl -X GET "http://localhost:5000/api/movies/search?q=dark"

# Search by genre
curl -X GET "http://localhost:5000/api/movies/search?q=drama"
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "genre": "Drama",
      "description": "...",
      "poster_url": "...",
      "rating": 9.3,
      "created_at": "2025-12-11T10:30:45.000Z",
      "updated_at": "2025-12-11T10:30:45.000Z"
    }
  ],
  "message": "Found 1 movie(s)"
}
```

---

### 4️⃣ **CREATE NEW MOVIE**

**Endpoint**: `POST /api/movies`

**curl Command**:
```bash
curl -X POST http://localhost:5000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Interstellar",
    "genre": "Science Fiction",
    "description": "A team of astronauts travel through a wormhole in space...",
    "poster_url": "https://m.media-amazon.com/images/...",
    "rating": 8.6
  }'
```

**Request Body**:
```json
{
  "title": "Interstellar",
  "genre": "Science Fiction",
  "description": "A team of astronauts travel through a wormhole in space...",
  "poster_url": "https://m.media-amazon.com/images/...",
  "rating": 8.6
}
```

**Expected Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": 6,
    "title": "Interstellar",
    "genre": "Science Fiction",
    "description": "A team of astronauts travel through a wormhole in space...",
    "poster_url": "https://m.media-amazon.com/images/...",
    "rating": 8.6
  },
  "message": "Movie created successfully"
}
```

**Error Response** (400 Bad Request - Missing Fields):
```json
{
  "success": false,
  "message": "Missing required fields: title, genre, description, poster_url"
}
```

---

### 5️⃣ **UPDATE MOVIE**

**Endpoint**: `PUT /api/movies/:id`

**curl Command**:
```bash
curl -X PUT http://localhost:5000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 9.5,
    "description": "Updated description..."
  }'
```

**Request Body** (only include fields to update):
```json
{
  "rating": 9.5,
  "description": "Two imprisoned men bond over many years..."
}
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Shawshank Redemption",
    "rating": 9.5,
    "description": "Updated description..."
  },
  "message": "Movie updated successfully"
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Movie not found"
}
```

---

### 6️⃣ **DELETE MOVIE**

**Endpoint**: `DELETE /api/movies/:id`

**curl Command**:
```bash
curl -X DELETE http://localhost:5000/api/movies/6
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Movie not found"
}
```

---

### 7️⃣ **CREATE REVIEW**

**Endpoint**: `POST /api/reviews`

**curl Command**:
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "John Doe",
    "email": "john@example.com",
    "movie_title": "The Shawshank Redemption",
    "rating": 10,
    "review_text": "This is an amazing movie!"
  }'
```

**Request Body**:
```json
{
  "user_name": "John Doe",
  "email": "john@example.com",
  "movie_title": "The Shawshank Redemption",
  "rating": 10,
  "review_text": "This is an amazing movie!"
}
```

**Expected Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_name": "John Doe",
    "email": "john@example.com",
    "movie_title": "The Shawshank Redemption",
    "rating": 10,
    "review_text": "This is an amazing movie!"
  },
  "message": "Review submitted successfully"
}
```

**Error Response** (400 Bad Request - Invalid Rating):
```json
{
  "success": false,
  "message": "Rating must be a number between 1 and 10"
}
```

---

### 8️⃣ **GET ALL REVIEWS**

**Endpoint**: `GET /api/reviews`

**curl Command**:
```bash
curl -X GET http://localhost:5000/api/reviews
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_name": "John Doe",
      "email": "john@example.com",
      "movie_title": "The Shawshank Redemption",
      "rating": 10,
      "review_text": "This is an amazing movie!",
      "created_at": "2025-12-11T11:00:00.000Z"
    },
    ...
  ],
  "message": "Reviews fetched successfully"
}
```

---

## 🧪 VALIDATION RULES

### Movies
- ✅ **title**: Required, string
- ✅ **genre**: Required, string
- ✅ **description**: Required, text
- ✅ **poster_url**: Required, URL string
- ✅ **rating**: Optional, number between 0-10

### Reviews
- ✅ **user_name**: Required, string
- ✅ **email**: Required, valid email format
- ✅ **movie_title**: Required, string
- ✅ **rating**: Required, integer between 1-10
- ✅ **review_text**: Optional, text

---

## ⚠️ ERROR HANDLING

### Common Error Responses

**400 Bad Request**:
```json
{
  "success": false,
  "message": "Description of the validation error"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (in development mode)"
}
```

---

## 📮 Postman Collection Import

You can import all these endpoints into Postman. Here's how:

1. **Create a new Postman Collection** named "MovieMania"
2. **Add each endpoint** with the requests shown above
3. **Set Headers**: Content-Type: application/json
4. **Test all endpoints** using the examples provided

---

## ✅ TESTING CHECKLIST

- [ ] GET /api/movies - Fetch all movies
- [ ] GET /api/movies/1 - Fetch single movie
- [ ] GET /api/movies/search?q=drama - Search movies
- [ ] POST /api/movies - Create new movie
- [ ] PUT /api/movies/1 - Update movie
- [ ] DELETE /api/movies/6 - Delete movie
- [ ] POST /api/reviews - Create review
- [ ] GET /api/reviews - Get all reviews

All tests passing! ✅
