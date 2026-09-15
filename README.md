# 🔗 LinkZip

> A full-stack URL shortener that lets users create, manage, and track shortened URLs with detailed click analytics.

## 🌐 Live Demo

- **Frontend:** https://linkzip-kappa.vercel.app
- **Backend:** https://server-iota-two-26.vercel.app

## ✨ Features

- 🔐 User registration and login
- 🍪 JWT authentication using HTTP-only cookies
- 🔗 Create shortened URLs
- ✏️ Custom URL aliases
- ⏳ URL expiration
- 📊 Click analytics
- 👤 Personal dashboard
- 📋 Copy shortened URLs
- ✏️ Update existing links
- 🗑️ Delete links
- 📱 Responsive UI
- 🔍 Detailed click information

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- NanoID
- CORS
- Cookie Parser

## 📂 Project Structure

```text
LinkZip/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CreateLink.tsx
│   │   │   ├── LinkDetails.tsx
│   │   │   ├── Redirect.tsx
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── authSlice.ts
│   │   │   └── store.ts
│   │   │
│   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── controller/
│   │   │   ├── user.ts
│   │   │   ├── link.ts
│   │   │   └── click.ts
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   │
│   │   ├── models/
│   │   │   ├── user.ts
│   │   │   ├── link.ts
│   │   │   └── click.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── user.ts
│   │   │   ├── link.ts
│   │   │   └── click.ts
│   │   │
│   │   └── index.ts
│   │
│   └── package.json
│
└── README.md
