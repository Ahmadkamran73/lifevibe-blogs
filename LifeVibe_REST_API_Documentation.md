# LifeVibe Blog Platform - REST API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [API Endpoints](#api-endpoints)
   - [Posts](#posts-endpoints)
   - [Admin Authentication](#admin-authentication-endpoints)
8. [Data Models](#data-models)
9. [Status Codes](#status-codes)
10. [Examples](#examples)
11. [SDKs and Tools](#sdks-and-tools)

## Overview

The LifeVibe REST API provides access to the blog platform's functionality, including blog post management and admin authentication. The API follows RESTful principles and returns JSON responses.

### Key Features
- **CRUD Operations**: Full create, read, update, delete functionality for blog posts
- **JWT Authentication**: Secure token-based authentication for admin operations
- **Category Support**: Built-in support for Travel, Food, and Wellness categories
- **Error Handling**: Comprehensive error responses with meaningful messages
- **Validation**: Input validation for all endpoints

## Base URL

```
Development: http://localhost:5000
Production: https://your-domain.com/api
```

## Authentication

The API uses JWT (JSON Web Token) authentication for protected endpoints.

### Authentication Flow
1. Obtain a JWT token using the admin login endpoint
2. Include the token in the `Authorization` header for protected requests
3. Token format: `Bearer <your-jwt-token>`

### Token Expiration
- **Duration**: 2 hours
- **Refresh**: No automatic refresh; re-authentication required after expiration

### Protected Endpoints
All endpoints that modify data (POST, PUT, DELETE) require admin authentication.

## Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "data": {}, // or []
  "message": "Success message (optional)"
}
```

### Error Response
```json
{
  "error": "Error message description",
  "code": "ERROR_CODE (optional)",
  "details": {} // Additional error details (optional)
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid request data or parameters
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Rate Limiting

Currently, no rate limiting is implemented. Future versions may include:
- **Rate Limit**: 100 requests per minute per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

# API Endpoints

## Posts Endpoints

### 1. Get All Posts

Retrieve all blog posts sorted by creation date (newest first).

- **URL**: `/posts`
- **Method**: `GET`
- **Authentication**: Not required
- **Parameters**: None

#### Response

**Success (200 OK)**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Amazing Travel Destination",
    "content": "Discover the beauty of...",
    "category": "Travel",
    "author": "John Doe",
    "imageURL": "https://example.com/image.jpg",
    "createdAt": "2025-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Healthy Breakfast Recipe",
    "content": "Start your day with...",
    "category": "Food",
    "author": "Jane Smith",
    "imageURL": "https://example.com/breakfast.jpg",
    "createdAt": "2025-01-14T08:15:00Z"
  }
]
```

**Error (500 Internal Server Error)**
```json
{
  "error": "Server error"
}
```

#### Example cURL
```bash
curl -X GET "http://localhost:5000/posts" \
  -H "Content-Type: application/json"
```

---

### 2. Get Post by ID

Retrieve a specific blog post by its ID.

- **URL**: `/posts/:id`
- **Method**: `GET`
- **Authentication**: Not required
- **Parameters**: 
  - `id` (path parameter): MongoDB ObjectID of the post

#### Response

**Success (200 OK)**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Amazing Travel Destination",
  "content": "Discover the beauty of this hidden gem...",
  "category": "Travel",
  "author": "John Doe",
  "imageURL": "https://example.com/image.jpg",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Error (404 Not Found)**
```json
{
  "error": "Post not found"
}
```

**Error (500 Internal Server Error)**
```json
{
  "error": "Server error"
}
```

#### Example cURL
```bash
curl -X GET "http://localhost:5000/posts/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json"
```

---

### 3. Create New Post

Create a new blog post.

- **URL**: `/posts`
- **Method**: `POST`
- **Authentication**: **Required** (Admin only)
- **Content-Type**: `application/json`

#### Request Body
```json
{
  "title": "Your Post Title",
  "content": "Your post content here...",
  "category": "Travel", // Required: "Travel", "Food", or "Wellness"
  "author": "Author Name",
  "imageURL": "https://example.com/image.jpg" // Optional
}
```

#### Response

**Success (201 Created)**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Your Post Title",
  "content": "Your post content here...",
  "category": "Travel",
  "author": "Author Name",
  "imageURL": "https://example.com/image.jpg",
  "createdAt": "2025-01-15T12:00:00Z"
}
```

**Error (400 Bad Request)**
```json
{
  "error": "Invalid data"
}
```

**Error (401 Unauthorized)**
```json
{
  "message": "No token provided"
}
```

#### Example cURL
```bash
curl -X POST "http://localhost:5000/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Amazing Travel Destination",
    "content": "Discover the beauty of this hidden gem...",
    "category": "Travel",
    "author": "John Doe",
    "imageURL": "https://example.com/image.jpg"
  }'
```

---

### 4. Update Post

Update an existing blog post.

- **URL**: `/posts/:id`
- **Method**: `PUT`
- **Authentication**: **Required** (Admin only)
- **Content-Type**: `application/json`
- **Parameters**: 
  - `id` (path parameter): MongoDB ObjectID of the post

#### Request Body
```json
{
  "title": "Updated Post Title",
  "content": "Updated post content...",
  "category": "Food",
  "author": "Updated Author Name",
  "imageURL": "https://example.com/new-image.jpg"
}
```

#### Response

**Success (200 OK)**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Post Title",
  "content": "Updated post content...",
  "category": "Food",
  "author": "Updated Author Name",
  "imageURL": "https://example.com/new-image.jpg",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Error (404 Not Found)**
```json
{
  "error": "Post not found"
}
```

**Error (400 Bad Request)**
```json
{
  "error": "Invalid update"
}
```

#### Example cURL
```bash
curl -X PUT "http://localhost:5000/posts/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated Post Title",
    "content": "Updated post content...",
    "category": "Food"
  }'
```

---

### 5. Delete Post

Delete a blog post.

- **URL**: `/posts/:id`
- **Method**: `DELETE`
- **Authentication**: **Required** (Admin only)
- **Parameters**: 
  - `id` (path parameter): MongoDB ObjectID of the post

#### Response

**Success (200 OK)**
```json
{
  "message": "Post deleted"
}
```

**Error (404 Not Found)**
```json
{
  "error": "Post not found"
}
```

**Error (500 Internal Server Error)**
```json
{
  "error": "Server error"
}
```

#### Example cURL
```bash
curl -X DELETE "http://localhost:5000/posts/507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Admin Authentication Endpoints

### 1. Admin Login

Authenticate admin user and receive JWT token.

- **URL**: `/api/admin/login`
- **Method**: `POST`
- **Authentication**: Not required
- **Content-Type**: `application/json`

#### Request Body
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### Response

**Success (200 OK)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401 Unauthorized)**
```json
{
  "message": "Invalid credentials"
}
```

#### Example cURL
```bash
curl -X POST "http://localhost:5000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

#### Usage Example
```javascript
// Store the token for future requests
const response = await fetch('/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
});

const { token } = await response.json();
localStorage.setItem('adminToken', token);
```

---

# Data Models

## Post Model

```javascript
{
  _id: ObjectId,           // Auto-generated MongoDB ID
  title: String,           // Required, post title
  content: String,         // Required, post content
  category: String,        // Required, enum: ["Travel", "Food", "Wellness"]
  author: String,          // Required, author name
  imageURL: String,        // Optional, image URL
  createdAt: Date         // Auto-generated timestamp
}
```

### Field Validation
- **title**: Required, string, 1-200 characters
- **content**: Required, string, minimum 10 characters
- **category**: Required, must be one of: "Travel", "Food", "Wellness"
- **author**: Required, string, 1-100 characters
- **imageURL**: Optional, valid URL format

## JWT Token Payload

```javascript
{
  username: String,        // Admin username
  isAdmin: Boolean,        // Admin role indicator
  iat: Number,            // Issued at timestamp
  exp: Number             // Expiration timestamp
}
```

---

# Status Codes

The API uses standard HTTP status codes:

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

---

# Examples

## Complete Workflow Example

### 1. Admin Login
```javascript
const loginResponse = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
});
const { token } = await loginResponse.json();
```

### 2. Create a Post
```javascript
const createResponse = await fetch('/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Travel Adventure',
    content: 'I recently visited...',
    category: 'Travel',
    author: 'John Doe',
    imageURL: 'https://example.com/travel.jpg'
  })
});
const newPost = await createResponse.json();
```

### 3. Get All Posts
```javascript
const postsResponse = await fetch('/posts');
const allPosts = await postsResponse.json();
```

### 4. Update a Post
```javascript
const updateResponse = await fetch(`/posts/${postId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Updated Travel Adventure',
    content: 'Updated content...'
  })
});
const updatedPost = await updateResponse.json();
```

### 5. Delete a Post
```javascript
const deleteResponse = await fetch(`/posts/${postId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const result = await deleteResponse.json();
```

## Error Handling Example

```javascript
async function createPost(postData, token) {
  try {
    const response = await fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error.message);
    throw error;
  }
}
```

---

# SDKs and Tools

## Postman Collection

You can import this API into Postman using the following collection:

```json
{
  "info": {
    "name": "LifeVibe API",
    "description": "LifeVibe Blog Platform REST API"
  },
  "item": [
    {
      "name": "Admin Login",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/admin/login",
        "body": {
          "mode": "raw",
          "raw": "{\"username\":\"admin\",\"password\":\"admin123\"}"
        }
      }
    },
    {
      "name": "Get All Posts",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/posts"
      }
    },
    {
      "name": "Create Post",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/posts",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ]
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000"
    }
  ]
}
```

## Environment Variables

Create a `.env` file in your backend directory:

```env
MONGO_URI=mongodb://localhost:27017/lifevibe
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

## Testing with curl

### Get all posts
```bash
curl -X GET "http://localhost:5000/posts"
```

### Login as admin
```bash
curl -X POST "http://localhost:5000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Create a post (with token)
```bash
curl -X POST "http://localhost:5000/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post",
    "category": "Travel",
    "author": "Test Author"
  }'
```

---

## Notes

- **Base URL**: Update the base URL according to your deployment environment
- **CORS**: The API includes CORS middleware for cross-origin requests
- **Security**: In production, ensure to use strong JWT secrets and HTTPS
- **Database**: MongoDB connection required for all endpoints to function
- **Validation**: Input validation is performed on the server side
- **Timestamps**: All timestamps are in ISO 8601 format (UTC)

This API documentation provides everything needed to integrate with the LifeVibe blog platform programmatically.