# Realtime Notifications System

A full-stack real-time notification system built using React, Node.js, Socket.IO, and PostgreSQL.

This project demonstrates authentication, protected APIs, WebSocket communication, private socket rooms, and live user-specific notifications without page refresh.

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt

## Real-Time System

* Socket.IO integration
* Live notifications
* User-specific private rooms
* Multi-user realtime communication
* Instant frontend updates without refresh

## Database

* PostgreSQL database
* Relational schema
* Notification persistence
* User-specific notifications

## Frontend

* React Hooks
* React Router
* Axios API integration
* Live state updates

---

# Tech Stack

## Frontend

* React
* Axios
* React Router
* Socket.IO Client

## Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* bcrypt

## Database

* PostgreSQL

---

# Project Structure

```bash
realtime-notifications/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── db/
│   │   └── socket.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key
```

## Start backend server

```bash
npm run dev
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm start
```

---

# Database Setup

Create PostgreSQL tables:

## Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
```

## Notifications Table

```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# API Routes

## Authentication Routes

| Method | Route              | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register user    |
| POST   | /api/auth/login    | Login user       |
| GET    | /api/auth/profile  | Get user profile |

---

## Notification Routes

| Method | Route                     | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | /api/notifications/create | Create notification    |
| GET    | /api/notifications        | Get user notifications |

---

# Realtime Architecture

```text
React Client
      ⇅
Socket.IO Connection
      ⇅
Node.js Server
      ⇅
PostgreSQL Database
```

---

# Socket Features

* Persistent WebSocket connection
* Private user rooms
* Targeted realtime notification delivery
* Event-driven communication

---

# Future Improvements

* Notification badges
* Read/unread notifications
* Online user tracking
* Redis adapter
* Docker deployment
* Cloud deployment
* Tailwind CSS UI
* Push notifications

---

# Learning Outcomes

This project helped in understanding:

* Full-stack development
* REST APIs
* JWT authentication
* PostgreSQL relationships
* Socket.IO architecture
* Realtime systems
* React Hooks
* Protected routes
* Event-driven programming

---

# Author

Anushrita Dey
