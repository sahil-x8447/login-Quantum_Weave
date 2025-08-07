# Authentication Demo

A simple login interface + JWT-based authentication example.

- **Backend:** Node.js, Express, bcrypt, JSON Web Tokens (JWT), dotenv  
- **Frontend:** Plain HTML/CSS/JavaScript  

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Prerequisites](#prerequisites)  
4. [Project Structure](#project-structure)  
5. [Setup & Run](#setup--run)  
   - [Backend](#backend)  
   - [Frontend](#frontend)  
6. [Usage](#usage)  
7. [Security Notes & Next Steps](#security-notes--next-steps)  

---

## Overview

This demo implements:

- A **login form** (username/email & password)  
- **Client-side validation** with inline error messages  
- **Server-side** password hashing (bcrypt) and credential checking  
- **JWT issuance** on login, stored in `localStorage`  
- A **protected API endpoint** that returns data only with a valid JWT  

---

## Features

- Clean, accessible UI (error & success styling)  
- Secure password storage & comparison via bcrypt  
- Token-based auth with JWTs  
- Example “Fetch Secure Data” button on the frontend  

---

## Prerequisites

- **Node.js** v14+ and **npm**  
- A modern web browser  

---

## Project Structure

root
├── backend
│ ├── .env # Environment vars (JWT_SECRET, PORT)
│ ├── package.json # Backend dependencies & scripts
│ └── server.js # Express server, auth routes & JWT logic
└── frontend
├── index.html # Login form & “Fetch Secure Data” button
├── style.css # UI styling
└── script.js # Client validation, fetch calls & UI updates


## Setup & Run

### Backend

1. **Enter the backend folder**  
   ```bash
   cd backend
2. Install dependencies
npm install

3. Create a .env file in backend/ with:
   JWT_SECRET=<your-random-secret>
  PORT=4000
4. Start the API server
npm start
The backend will run at:
http://localhost:4000

## Frontend
Open the frontend folder


cd ../frontend
Serve or open index.html in your browser.

You can just double-click the file, or

Use a simple static server (e.g. npx serve .)


## Usage
# Login

Username: demo

Password: Password123!

On success, you’ll see a green “Logged in successfully!” message and your JWT in the browser console.

Fetch Secure Data

Click Fetch Secure Data

You should see: Hello user 1!

## Security Notes & Next Steps

HTTPS: Always serve over HTTPS in production.

HttpOnly Cookies: Consider storing JWTs in secure, HttpOnly cookies to mitigate XSS.

Rate Limiting: Throttle login attempts to prevent brute-force attacks.

Refresh Tokens: Implement refresh-token flows for seamless session renewal.

Database Integration: Replace the in-memory user store with a persistent database.

Role-Based Access: Embed roles/permissions in the JWT payload for authorization.
