# Medium Clone - Full Stack Blogging Platform

A full-stack Medium clone built with modern web technologies, featuring a serverless backend deployed on Cloudflare Workers and a responsive React frontend.

![Medium Clone](https://img.shields.io/badge/Status-In%20Development-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=Cloudflare&logoColor=white)

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Blog Management**: Create, read, and publish blog posts
- **Rich Content**: Support for rich text content and formatting
- **Author Profiles**: User profiles with author information
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Real-time Updates**: State management with Jotai for optimal UX
- **Serverless Architecture**: Built for scalability with Cloudflare Workers
- **Blog Caching**: Client-side caching for improved performance
- **Type Safety**: Full TypeScript implementation across the stack

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Jotai** - Primitive and flexible state management

### Backend
- **Hono** - Fast, lightweight web framework for Cloudflare Workers
- **Cloudflare Workers** - Serverless runtime for edge computing
- **Prisma** - Modern database toolkit and ORM
- **PostgreSQL** - Robust relational database
- **Prisma Accelerate** - Database connection pooling and caching
- **JWT** - JSON Web Tokens for authentication

### Shared/Common
- **Zod** - TypeScript-first schema validation
- **Custom npm package** - Shared types and validation schemas

### Database Schema
- **User Model**: User authentication and profile management
- **Blog Model**: Blog posts with author relationships
- **Published Dates**: Automatic timestamp management

## 📁 Project Structure

```
Medium/
├── backend/                 # Cloudflare Workers backend
│   ├── src/
│   │   ├── index.ts        # Main server entry point
│   │   ├── routes/         # API route handlers
│   │   │   ├── user.ts     # User authentication routes
│   │   │   └── blog.ts     # Blog CRUD operations
│   │   └── generated/      # Prisma generated client
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   ├── wrangler.jsonc      # Cloudflare Workers config
│   └── package.json
│
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── AppBar.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── Avatar.tsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── Blogs.tsx
│   │   │   ├── FullBlog.tsx
│   │   │   ├── Publish.tsx
│   │   │   └── ...
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── BlogsHook.ts
│   │   │   └── BlogIdHook.ts
│   │   ├── atoms/          # Jotai state atoms
│   │   │   ├── blogsAtom.ts
│   │   │   ├── userAtom.ts
│   │   │   └── cacheBlogAtom.ts
│   │   └── assets/
│   ├── public/
│   └── package.json
│
└── common/                 # Shared validation schemas
    ├── src/
    │   ├── user.ts         # User validation schemas
    │   ├── blog.ts         # Blog validation schemas
    │   └── index.ts
    └── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Cloudflare account (for deployment)
- PostgreSQL database (or Prisma-compatible database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Medium
   ```

2. **Install dependencies for all packages**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install common package dependencies
   cd ../common
   npm install
   ```

3. **Set up environment variables**
   
   Update `backend/wrangler.jsonc` with your database URL and JWT secret:
   ```jsonc
   {
     "vars": {
       "DATABASE_URL": "your-database-url",
       "JWT_SECRET": "your-jwt-secret"
     }
   }
   ```

4. **Set up the database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Update frontend configuration**
   
   Update `frontend/src/config.ts` with your backend URL:
   ```typescript
   export const BACKEND_URL = "your-backend-url"
   ```

### Running the Application

1. **Start the backend (development)**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend (development)**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Build common package (if modified)**
   ```bash
   cd common
   npm run build
   ```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run deploy
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the dist folder to your preferred hosting service
```

## 📖 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/signin` - User login

### Blog Operations
- `GET /api/v1/blog/bulk` - Get all blogs
- `GET /api/v1/blog/:id` - Get specific blog
- `POST /api/v1/blog` - Create new blog
- `PUT /api/v1/blog/:id` - Update blog

## 🎨 Features in Detail

### Blog Caching System
The application implements a sophisticated client-side caching system:
- Blogs are cached after first load for improved performance
- Cache invalidation to ensure fresh content
- Optimistic UI updates for better user experience

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layout for different screen sizes
- Optimized typography and spacing

### State Management
- Jotai atoms for granular state management
- Separate atoms for blogs, users, and cache
- Efficient re-renders and state updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built as part of a full-stack development learning journey
- Inspired by Medium's clean and minimal design
- Utilizes modern web development best practices

---

**Note**: This is a learning project and may contain areas for improvement. Contributions and suggestions are welcome!
