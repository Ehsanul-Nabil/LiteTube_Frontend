# LiteTube Frontend

## 🌟 Overview

LiteTube is a fully functional, real-world multi-page video sharing web application built with **React** and **Vite**. It uses **React Router** for seamless client-side navigation, follows a modular component architecture, and implements custom hooks for scalable state management.

Users can browse, search, upload, and watch videos while interacting through likes and comments. The application communicates with a FastAPI backend using REST APIs and supports secure token-based authentication.

---

## 🚀 Key Features

- **Real-World Routing**
  - Multi-page navigation using `react-router-dom`
  - Dynamic routes (e.g., `/watch/:id`)

- **Modular Architecture**
  - Centralized API layer
  - Reusable UI components
  - Custom React hooks
  - Separate page components

- **Video Management**
  - Browse videos
  - Search videos
  - Watch videos
  - Upload videos

- **User Authentication**
  - User registration
  - Secure login
  - Token-based authentication

- **Interactive Features**
  - Like and unlike videos
  - Post comments
  - View all comments

- **Responsive Design**
  - Built with Tailwind CSS
  - Mobile-friendly interface

---

## 📁 Project Structure

```text
src/
├── api/
│   └── api.js                  # Centralized fetch requests & API endpoints
│
├── components/
│   ├── CommentSection.jsx      # Reusable comment list & input
│   ├── Navbar.jsx              # Navigation bar
│   └── VideoCard.jsx           # Video preview card
│
├── hooks/
│   └── useMiniTube.jsx         # Custom hook for application state
│
├── pages/
│   ├── Home.jsx                # Home page
│   ├── Login.jsx               # Login page
│   ├── Register.jsx            # Registration page
│   ├── Upload.jsx              # Upload page
│   └── Watch.jsx               # Watch video page
│
├── index.css                   # Tailwind CSS configuration
├── App.jsx                     # Route configuration
└── main.jsx                    # Application entry point
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend Library |
| Vite | Build Tool |
| React Router DOM | Client-side Routing |
| Tailwind CSS | Styling |
| JavaScript (ES6+) | Programming Language |
| Fetch API | Backend Communication |

---

## ⚙️ Prerequisites

Before running the project, make sure you have:

- Node.js
- npm
- FastAPI backend running on:

```text
http://127.0.0.1:8000
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/minitube-frontend.git
```

### 2. Navigate to the project

```bash
cd minitube-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install React Router

```bash
npm install react-router-dom
```

### 5. Start the development server

```bash
npm run dev
```

---

## 📦 API Configuration

The frontend communicates with the backend through the API configuration located in:

```text
src/api/api.js
```

Default API URL:

```javascript
const API_BASE = "http://127.0.0.1:8000";
```

Update this URL if your backend is hosted elsewhere.

---

## 🔐 Authentication

LiteTube uses token-based authentication.

### Features

- User Registration
- User Login
- Token Storage
- Authenticated Video Upload
- Like Videos
- Comment on Videos

---

## 📺 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/login` | Login page |
| `/register` | Registration page |
| `/upload` | Upload a video |
| `/watch/:id` | Watch a selected video |

---

## 🎨 Styling

The project uses **Tailwind CSS** for styling.

Benefits include:

- Responsive layouts
- Utility-first classes
- Fast UI development
- Modern design

---

## ⚡ Development

This project is powered by **Vite**, providing:

- Hot Module Replacement (HMR)
- Fast startup
- Optimized builds

Official React plugins:

- `@vitejs/plugin-react`
- `@vitejs/plugin-react-swc`

---

## 🔮 Future Improvements

- User profiles
- Video categories
- Playlist support
- Video subscriptions
- Notifications
- Dark mode
- Infinite scrolling
- Video recommendations
- Video history
- Responsive sidebar

---

## 📝 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it according to the license terms.