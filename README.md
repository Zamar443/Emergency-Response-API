# Emergency-Response-API

##  Overview

In many urban areas, especially high-density cities, emergency response is often delayed due to poor coordination and lack of real-time visibility.

This project is a **real-time emergency response coordination system** that connects users to the nearest available responders using **geospatial intelligence, live tracking, and smart dispatch logic**.

---

##  Problem Statement

Emergency situations require **fast and efficient response**, but existing systems often suffer from:

* Delayed response times
* Poor location tracking
* Lack of real-time coordination
* Inefficient responder allocation

---

## Solution

This system allows users to report emergencies and automatically:

*  Detects their location
*  Finds the nearest responder using geo-queries
*  Assigns responders instantly
*  Displays emergencies on a live map
*  Simulates real-time responder movement

---

## Key Features

### Authentication

* User & responder registration
* Secure login with JWT

### Emergency Reporting

* Report emergency with location (latitude & longitude)
* Automatic priority detection (AI-inspired logic)

## Smart Dispatch System

* Uses MongoDB geospatial queries (`2dsphere`)
* Finds nearest responder within radius
* Assigns responder automatically

## Real-Time Updates

* Socket.io for live communication
* Instant emergency notifications
* Live responder movement simulation

### Live Map Visualization

* Built with Leaflet.js
* Displays:

  * Emergency locations 
  * Moving responders 

###  Admin Insights

* Total emergencies
* Pending vs resolved cases

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Real-Time

* Socket.io

### Frontend (Lightweight Demo)

* HTML + Leaflet.js
* OpenStreetMap

### Other Tools

* JWT Authentication
* bcrypt (password hashing)

## Installation & Setup

### 1. Clone the repo

```bash
git clone git@github.com:Zamar443/Emergency-Response-API.git
cd emergency-response-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Seed responders

```bash
node seed.js
```

### 5. Start MongoDB

If you installed MongoDB as a service, start it first:

```bash
net start MongoDB
```

If you need to run it manually (Windows):

```bash
npm run start:db
```

Then start the API:

```bash
npm run start
```

For hot reload during development:

```bash
npm run dev
```

---

## 🔌 API Endpoints

###  Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

###  Emergency

* `POST /api/emergency/report` (Protected)
* `GET /api/emergency/stats`

---

##  Demo Flow

1. Register & login a user
2. Report an emergency
3. Open the map (`http://localhost:5000`)
4. Watch:

   *  Emergency appear instantly
   *  Responders moving in real-time

## API Endpoint testing url
http://localhost:5000/api-docs/

##  How It Works

1. User reports emergency
2. System stores location using GeoJSON
3. MongoDB performs `$near` query
4. Closest responder is assigned
5. Socket.io emits real-time event
6. Frontend updates instantly

---

##  Real-World Impact

This system can:

* Reduce emergency response time
* Improve coordination between responders
* Provide real-time situational awareness
* Potentially save lives

---

##  Future Improvements

* SMS/Call integration (Twilio)
* AI-based severity prediction
* Mobile app (React Native)
* Live GPS tracking integration
* Admin dashboard (React)

---

##  Author

**Femi Kareem**