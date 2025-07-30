# LifeVibe Blog Platform - Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend (React + Vite)"
        A[React Application]
        A1[Pages]
        A2[Components]
        A3[Styles]
        A4[Routing]
        
        A1 --> A11[Home]
        A1 --> A12[PostDetail]
        A1 --> A13[AddPost]
        A1 --> A14[EditPost]
        A1 --> A15[AdminLogin]
        A1 --> A16[NotFound]
        
        A2 --> A21[Navbar]
        A2 --> A22[Footer]
        A2 --> A23[PostCard]
        A2 --> A24[PostList]
        
        A3 --> A31[Navbar.css]
        A3 --> A32[PostCard.css]
        A3 --> A33[PostForm.css]
        
        A4 --> A41[React Router]
        A4 --> A42[Protected Routes]
        A4 --> A43[Admin Context]
    end

    subgraph "Backend (Node.js + Express)"
        B[Express Server]
        B1[Routes]
        B2[Controllers]
        B3[Models]
        B4[Middleware]
        
        B1 --> B11[Posts Routes]
        B1 --> B12[Admin Routes]
        
        B2 --> B21[Post Controller]
        B2 --> B22[Admin Controller]
        
        B3 --> B31[Post Model]
        
        B4 --> B41[Auth Middleware]
        B4 --> B42[CORS]
        B4 --> B43[JSON Parser]
    end

    subgraph "Database"
        C[MongoDB]
        C1[Posts Collection]
    end

    subgraph "Authentication"
        D[JWT Token System]
        D1[Admin Login]
        D2[Token Verification]
        D3[Protected Endpoints]
    end

    A -->|HTTP Requests| B
    B -->|Database Queries| C
    B -->|JWT Tokens| D
    A -->|Store/Verify Tokens| D
```

## Detailed Component Architecture

```mermaid
graph LR
    subgraph "Frontend Components"
        F1[App.jsx]
        F2[AdminContext]
        F3[Router]
        
        F1 --> F2
        F1 --> F3
        
        F3 --> P1[Home Page]
        F3 --> P2[PostDetail Page]
        F3 --> P3[AddPost Page]
        F3 --> P4[EditPost Page]
        F3 --> P5[AdminLogin Page]
        
        P1 --> C1[PostList Component]
        C1 --> C2[PostCard Component]
        
        F1 --> N1[Navbar Component]
        F1 --> F1[Footer Component]
    end
    
    subgraph "Backend Structure"
        S1[server.js]
        S1 --> R1[/posts routes]
        S1 --> R2[/api/admin routes]
        
        R1 --> PC[PostController]
        R2 --> AC[AdminController]
        
        PC --> PM[Post Model]
        AC --> AUTH[JWT Auth]
        
        R1 --> MW[Auth Middleware]
    end
```

## API Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User/Admin
    participant F as Frontend (React)
    participant B as Backend (Express)
    participant DB as MongoDB
    participant AUTH as JWT Auth

    Note over U,AUTH: Public Operations
    U->>F: Visit Blog
    F->>B: GET /posts
    B->>DB: Find all posts
    DB-->>B: Return posts array
    B-->>F: JSON response
    F-->>U: Display posts

    Note over U,AUTH: Admin Login
    U->>F: Enter admin credentials
    F->>B: POST /api/admin/login
    B->>AUTH: Validate credentials
    AUTH-->>B: Generate JWT token
    B-->>F: Return token
    F->>F: Store token in localStorage

    Note over U,AUTH: Protected Operations
    U->>F: Create new post
    F->>B: POST /posts (with JWT)
    B->>AUTH: Verify token
    AUTH-->>B: Token valid
    B->>DB: Create new post
    DB-->>B: Post created
    B-->>F: Success response
    F-->>U: Show success message
```

## Database Schema Diagram

```mermaid
erDiagram
    POST {
        ObjectId _id PK
        String title
        String content
        String category
        String author
        String imageURL
        Date createdAt
    }
    
    POST ||--|| CATEGORY : belongs_to
    
    CATEGORY {
        String name
    }
    
    CATEGORY ||--o{ VALUES : contains
    VALUES {
        String Travel
        String Food
        String Wellness
    }
```

## Authentication Flow

```mermaid
flowchart TD
    A[User Access] --> B{Is Protected Route?}
    B -->|No| C[Allow Access]
    B -->|Yes| D[Check JWT Token]
    D --> E{Token Exists?}
    E -->|No| F[Redirect to Login]
    E -->|Yes| G[Verify Token]
    G --> H{Token Valid?}
    H -->|No| I[Clear Token & Redirect]
    H -->|Yes| J[Check Admin Status]
    J --> K{Is Admin?}
    K -->|No| L[Access Denied]
    K -->|Yes| M[Allow Access]
    
    F --> N[Admin Login Page]
    N --> O[Submit Credentials]
    O --> P{Valid Credentials?}
    P -->|No| Q[Show Error]
    P -->|Yes| R[Generate JWT]
    R --> S[Store Token]
    S --> T[Grant Access]
```

## Technology Stack

```mermaid
graph TB
    subgraph "Frontend Stack"
        FE1[React 19.1.0]
        FE2[React Router DOM 7.7.1]
        FE3[Bootstrap 5.3.7]
        FE4[Vite 7.0.4]
        FE5[ESLint]
    end
    
    subgraph "Backend Stack"
        BE1[Node.js]
        BE2[Express 4.18.2]
        BE3[Mongoose 7.6.1]
        BE4[JWT 9.0.2]
        BE5[bcryptjs 2.4.3]
        BE6[CORS 2.8.5]
        BE7[dotenv 16.3.1]
    end
    
    subgraph "Database"
        DB1[MongoDB]
    end
    
    subgraph "Development Tools"
        DT1[Nodemon 3.1.10]
        DT2[Vite Dev Server]
    end
```

## File Structure Overview

```mermaid
graph TD
    ROOT[Project Root]
    
    ROOT --> FE[frontend/]
    ROOT --> BE[backend/]
    ROOT --> GIT[.git/]
    
    FE --> FE_SRC[src/]
    FE --> FE_PUBLIC[public/]
    FE --> FE_CONFIG[config files]
    
    FE_SRC --> PAGES[pages/]
    FE_SRC --> COMP[components/]
    FE_SRC --> STYLES[styles/]
    FE_SRC --> APP[App.jsx]
    FE_SRC --> MAIN[main.jsx]
    
    BE --> ROUTES[routes/]
    BE --> CONTROLLERS[controllers/]
    BE --> MODELS[models/]
    BE --> MIDDLEWARE[middleware/]
    BE --> SERVER[server.js]
    
    ROUTES --> R1[posts.js]
    ROUTES --> R2[admin.js]
    
    CONTROLLERS --> C1[postController.js]
    CONTROLLERS --> C2[adminController.js]
    
    MODELS --> M1[Post.js]
    
    MIDDLEWARE --> MW1[auth.js]
```

## Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        S1[CORS Protection]
        S2[JWT Authentication]
        S3[Route Protection]
        S4[Input Validation]
    end
    
    subgraph "Admin Protection"
        A1[Admin Credentials Check]
        A2[JWT Token Generation]
        A3[Token Verification Middleware]
        A4[Admin Status Validation]
    end
    
    S1 --> S2 --> S3 --> S4
    A1 --> A2 --> A3 --> A4
    
    S2 -.->|Uses| A2
    S3 -.->|Uses| A3
```

## Deployment Architecture (Recommended)

```mermaid
graph TB
    subgraph "Production Environment"
        LB[Load Balancer]
        
        subgraph "Frontend Deployment"
            CDN[CDN/Static Hosting]
            CDN --> REACT[React Build]
        end
        
        subgraph "Backend Deployment"
            SERVER[Node.js Server]
            SERVER --> API[Express API]
        end
        
        subgraph "Database"
            MONGO[MongoDB Atlas/Cloud]
        end
        
        subgraph "Environment Variables"
            ENV[.env File]
            ENV --> MONGO_URI[MONGO_URI]
            ENV --> JWT_SECRET[JWT_SECRET]
            ENV --> PORT[PORT]
        end
    end
    
    LB --> CDN
    LB --> SERVER
    SERVER --> MONGO
    SERVER -.->|Reads| ENV
```

---

## Architecture Summary

This LifeVibe blog platform follows a **3-tier architecture**:

1. **Presentation Layer**: React frontend with Bootstrap styling
2. **Application Layer**: Express.js REST API with JWT authentication
3. **Data Layer**: MongoDB with Mongoose ODM

### Key Features:
- ✅ **RESTful API Design**
- ✅ **JWT-based Authentication**
- ✅ **Protected Admin Routes**
- ✅ **Responsive UI Components**
- ✅ **MongoDB Integration**
- ✅ **CORS-enabled Backend**
- ✅ **Modern React with Hooks**
- ✅ **Category-based Content Organization**