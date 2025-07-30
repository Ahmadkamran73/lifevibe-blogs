# LifeVibe Blog Platform - REST API Endpoints

## Base URL
```
http://localhost:5000
```

## Authentication
- **Type**: JWT (JSON Web Token)
- **Header**: `Authorization: Bearer <token>`
- **Admin Credentials**: 
  - Username: `admin`
  - Password: `admin123`

---

## 📝 Posts Endpoints

### 1. Get All Posts
**Endpoint**: `GET /posts`  
**Authentication**: Not required  
**Description**: Retrieve all blog posts sorted by creation date (newest first)

**Request:**
```http
GET /posts
Content-Type: application/json
```

**Response:**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6789012ab",
    "title": "Amazing Travel Experience in Bali",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "category": "Travel",
    "author": "John Doe",
    "imageURL": "https://example.com/bali-image.jpg",
    "createdAt": "2023-12-01T10:30:00.000Z"
  },
  {
    "_id": "64f8a1b2c3d4e5f6789012ac",
    "title": "Healthy Breakfast Recipes",
    "content": "Start your day with these nutritious breakfast options...",
    "category": "Wellness",
    "author": "Jane Smith",
    "imageURL": "https://example.com/breakfast.jpg",
    "createdAt": "2023-11-30T08:15:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. Get Post by ID
**Endpoint**: `GET /posts/:id`  
**Authentication**: Not required  
**Description**: Retrieve a specific blog post by its ID

**Request:**
```http
GET /posts/64f8a1b2c3d4e5f6789012ab
Content-Type: application/json
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6789012ab",
  "title": "Amazing Travel Experience in Bali",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  "category": "Travel",
  "author": "John Doe",
  "imageURL": "https://example.com/bali-image.jpg",
  "createdAt": "2023-12-01T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Post found
- `404 Not Found` - Post not found
- `500 Internal Server Error` - Server error

**Error Response:**
```json
{
  "error": "Post not found"
}
```

---

### 3. Create New Post
**Endpoint**: `POST /posts`  
**Authentication**: **Required** (Admin only)  
**Description**: Create a new blog post

**Request:**
```http
POST /posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "New Travel Adventure",
  "content": "This is the detailed content of my latest travel experience...",
  "category": "Travel",
  "author": "Admin",
  "imageURL": "https://example.com/new-adventure.jpg"
}
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6789012ad",
  "title": "New Travel Adventure",
  "content": "This is the detailed content of my latest travel experience...",
  "category": "Travel",
  "author": "Admin",
  "imageURL": "https://example.com/new-adventure.jpg",
  "createdAt": "2023-12-02T14:30:00.000Z"
}
```

**Required Fields:**
- `title` (String) - Post title
- `content` (String) - Post content/body
- `category` (String) - Must be one of: "Travel", "Food", "Wellness"
- `author` (String) - Author name

**Optional Fields:**
- `imageURL` (String) - URL to post image

**Status Codes:**
- `201 Created` - Post created successfully
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - No token provided
- `403 Forbidden` - Not authorized as admin

---

### 4. Update Post
**Endpoint**: `PUT /posts/:id`  
**Authentication**: **Required** (Admin only)  
**Description**: Update an existing blog post

**Request:**
```http
PUT /posts/64f8a1b2c3d4e5f6789012ab
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Updated Travel Experience in Bali",
  "content": "Updated content with more details about the amazing experience...",
  "category": "Travel",
  "imageURL": "https://example.com/updated-bali-image.jpg"
}
```

**Response:**
```json
{
  "_id": "64f8a1b2c3d4e5f6789012ab",
  "title": "Updated Travel Experience in Bali",
  "content": "Updated content with more details about the amazing experience...",
  "category": "Travel",
  "author": "John Doe",
  "imageURL": "https://example.com/updated-bali-image.jpg",
  "createdAt": "2023-12-01T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Post updated successfully
- `400 Bad Request` - Invalid update data
- `401 Unauthorized` - No token provided
- `403 Forbidden` - Not authorized as admin
- `404 Not Found` - Post not found

---

### 5. Delete Post
**Endpoint**: `DELETE /posts/:id`  
**Authentication**: **Required** (Admin only)  
**Description**: Delete a blog post

**Request:**
```http
DELETE /posts/64f8a1b2c3d4e5f6789012ab
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "message": "Post deleted"
}
```

**Status Codes:**
- `200 OK` - Post deleted successfully
- `401 Unauthorized` - No token provided
- `403 Forbidden` - Not authorized as admin
- `404 Not Found` - Post not found
- `500 Internal Server Error` - Server error

---

## 👤 Admin Endpoints

### 1. Admin Login
**Endpoint**: `POST /api/admin/login`  
**Authentication**: Not required  
**Description**: Authenticate admin user and receive JWT token

**Request:**
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzAzMjYyMDAwLCJleHAiOjE3MDMyNjkyMDB9.signature"
}
```

**Response (Failure):**
```json
{
  "message": "Invalid credentials"
}
```

**Status Codes:**
- `200 OK` - Login successful
- `401 Unauthorized` - Invalid credentials

**Token Details:**
- **Expires in**: 2 hours
- **Contains**: username, isAdmin flag, issued at time, expiration time

---

## 🔒 Authentication Details

### JWT Token Structure
```json
{
  "username": "admin",
  "isAdmin": true,
  "iat": 1703262000,
  "exp": 1703269200
}
```

### Protected Endpoints
All `POST`, `PUT`, and `DELETE` operations on posts require admin authentication:

- `POST /posts` - Create post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Authorization Header Format
```
Authorization: Bearer <jwt_token>
```

### Authentication Middleware Flow
1. Extract token from `Authorization` header
2. Verify token signature
3. Check if token contains `isAdmin: true`
4. Allow access if valid, reject otherwise

---

## 📊 Status Codes Summary

| Code | Description | When Used |
|------|-------------|-----------|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Missing/invalid token, wrong credentials |
| `403` | Forbidden | Valid token but not admin |
| `404` | Not Found | Resource doesn't exist |
| `500` | Internal Server Error | Database/server errors |

---

## 🧪 Example API Usage

### Complete Workflow Example

**1. Admin Login:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**2. Get All Posts:**
```bash
curl -X GET http://localhost:5000/posts
```

**3. Create New Post:**
```bash
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My New Blog Post",
    "content": "This is the content of my new blog post...",
    "category": "Travel",
    "author": "Admin",
    "imageURL": "https://example.com/image.jpg"
  }'
```

**4. Update Post:**
```bash
curl -X PUT http://localhost:5000/posts/POST_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated Blog Post Title",
    "content": "Updated content..."
  }'
```

**5. Delete Post:**
```bash
curl -X DELETE http://localhost:5000/posts/POST_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🚨 Error Response Format

All error responses follow this structure:

```json
{
  "error": "Error description"
}
```

or

```json
{
  "message": "Error message"
}
```

### Common Error Messages:
- `"Post not found"` - Resource doesn't exist
- `"Invalid credentials"` - Wrong username/password
- `"No token provided"` - Missing Authorization header
- `"Invalid token"` - Malformed or expired token
- `"Not authorized as admin"` - Valid token but not admin
- `"Invalid data"` - Request validation failed
- `"Server error"` - Internal server issues

---

## 📝 Post Model Schema

```json
{
  "_id": "ObjectId (auto-generated)",
  "title": "String (required)",
  "content": "String (required)", 
  "category": "String (required, enum: ['Travel', 'Food', 'Wellness'])",
  "author": "String (required)",
  "imageURL": "String (optional, default: '')",
  "createdAt": "Date (auto-generated)"
}
```

This comprehensive API documentation covers all the REST endpoints available in the LifeVibe blog platform project!