# LifeVibe API Quick Reference

## Base URL
```
Development: http://localhost:5000
Production: https://your-domain.com/api
```

## Authentication
```bash
# Login to get JWT token
POST /api/admin/login
{
  "username": "admin",
  "password": "admin123"
}

# Use token in Authorization header
Authorization: Bearer <your-jwt-token>
```

## API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET` | `/posts` | ❌ | Get all posts |
| `GET` | `/posts/:id` | ❌ | Get single post |
| `POST` | `/posts` | ✅ | Create new post |
| `PUT` | `/posts/:id` | ✅ | Update post |
| `DELETE` | `/posts/:id` | ✅ | Delete post |
| `POST` | `/api/admin/login` | ❌ | Admin login |

## Quick Examples

### 1. Get All Posts
```bash
curl -X GET "http://localhost:5000/posts"
```

### 2. Login as Admin
```bash
curl -X POST "http://localhost:5000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 3. Create Post (with token)
```bash
curl -X POST "http://localhost:5000/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Amazing Travel Destination",
    "content": "Discover the beauty...",
    "category": "Travel",
    "author": "John Doe"
  }'
```

### 4. Update Post
```bash
curl -X PUT "http://localhost:5000/posts/POST_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title": "Updated Title"}'
```

### 5. Delete Post
```bash
curl -X DELETE "http://localhost:5000/posts/POST_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Post Model
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Post Title",
  "content": "Post content...",
  "category": "Travel|Food|Wellness",
  "author": "Author Name",
  "imageURL": "https://example.com/image.jpg",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

## Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Categories
- `Travel` - Travel experiences, destinations, tips
- `Food` - Culinary content, recipes, reviews
- `Wellness` - Health, fitness, mental well-being

## JavaScript Examples

### Fetch All Posts
```javascript
const response = await fetch('/posts');
const posts = await response.json();
```

### Login and Store Token
```javascript
const loginResponse = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'admin123' })
});
const { token } = await loginResponse.json();
localStorage.setItem('adminToken', token);
```

### Create Post with Authentication
```javascript
const token = localStorage.getItem('adminToken');
const response = await fetch('/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Post',
    content: 'Post content...',
    category: 'Travel',
    author: 'John Doe'
  })
});
```

## Error Handling
```javascript
async function apiCall() {
  try {
    const response = await fetch('/posts');
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API call failed');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}
```

## Common Errors
- `"Invalid credentials"` - Wrong username/password
- `"No token provided"` - Missing Authorization header
- `"Invalid token"` - Expired or malformed JWT
- `"Post not found"` - Invalid post ID
- `"Invalid data"` - Missing required fields

## Environment Variables
```bash
# Backend .env file
MONGO_URI=mongodb://localhost:27017/lifevibe
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

## Testing Tools
- **Postman**: Import OpenAPI spec for interactive testing
- **Swagger UI**: Use OpenAPI spec for documentation
- **curl**: Command-line testing (examples above)
- **Insomnia**: REST client alternative to Postman