# Movie Tracker & Recommender

A polyglot full-stack web application that allows users to search, track, and manage their movie watchlists with a personalized recommendation engine. Built using the PERN stack and a Python-based microservice.

## 🚀 Key Features

* **Polyglot Architecture:** Combines a **Node.js/Express** REST API for core operations with a **Python/Flask** microservice dedicated to the recommendation logic.
* **Smart Recommendations:** A recommendation engine that analyzes the user's PostgreSQL watch history to suggest new movies based on genres and ratings.
* **Advanced JWT Authentication:** Secure, stateless authentication system implementing **Access & Refresh Tokens** with **Bcrypt** password hashing for maximum security.
* **TMDB Integration:** Seamless, real-time movie data fetching and searching via The Movie Database (TMDB) API.
* **Watchlist Management:** Full CRUD functionality allowing users to maintain a persistent movie history and "to-watch" lists in a relational database.
* **Responsive UI:** A modern, mobile-friendly interface built with **React** using Context API for efficient state management.

## 🛠 Tech Stack

**Frontend**
* React.js (Hooks, Context API)
* Axios (API communication)
* Tailwind CSS / Styled Components (opcjonalnie, zależy czego używasz)

**Backend (API & Auth)**
* Node.js & Express.js
* JSON Web Tokens (JWT) with Refresh Token patterns
* Bcrypt.js

**Backend (Recommendations)**
* Python & Flask
* Pandas / Scikit-learn (jeśli używasz ich do logiki rekomendacji)

**Database**
* PostgreSQL

**External Services**
* TMDB API

## ⚙️ Architecture

The app uses a microservice-like approach:
1.  **Main API (Node.js):** Handles user accounts, watchlist data, and serves as the primary gateway.
2.  **Recommendation Service (Flask):** Consumes data from the PostgreSQL database to process and return personalized movie suggestions, demonstrating cross-language service communication.
