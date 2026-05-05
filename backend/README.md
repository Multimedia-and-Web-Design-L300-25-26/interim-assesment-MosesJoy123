# Coinbase Clone – Backend API

RESTful API server for the Coinbase Clone cryptocurrency trading platform. Built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── models/                  # Mongoose schemas (User, Crypto)
├── routes/                  # API route handlers
├── controllers/             # Business logic
├── middleware/              # JWT auth & validation
├── config.js                # Configuration & dotenv setup
├── server.js                # Main server entry point
├── package.json             # Dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+)
- **npm** or yarn
- **MongoDB** (Atlas account or local MongoDB instance)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/backend-repo.git
   cd backend-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   Copy the environment variables template and configure:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env`):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coinbase-clone
   JWT_SECRET=your-super-secret-key-change-this-in-production
   PORT=5000
   FRONTEND_URL=http://localhost:5174
   ```
   
   **Note:** 
   - For MongoDB Atlas, get your connection string from your cluster dashboard
   - If MongoDB Atlas is unavailable, the server falls back to an in-memory database
   - `JWT_SECRET` should be a strong, random string (min 32 characters for production)
   - `FRONTEND_URL` is used for CORS configuration

5. **Start the server**
   ```bash
   npm run start
   ```
   Server runs on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes

#### Register (POST `/api/auth/register`)
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (400):**
```json
{
  "message": "User already exists"
}
```

---

#### Login (POST `/api/auth/login`)
Authenticate and retrieve a JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### User Profile Routes (Protected)

**All profile routes require:** `Authorization: Bearer <JWT_TOKEN>` header

#### Get Profile (GET `/api/profile`)
Retrieve the authenticated user's profile.

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-05-01T10:30:00Z"
  }
}
```

**Error (401):**
```json
{
  "message": "Token required or invalid"
}
```

---

#### Update Profile (PUT `/api/profile`)
Update the authenticated user's name or email.

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

---

### Cryptocurrency Routes

#### Get All Cryptos (GET `/api/crypto`)
Fetch all available cryptocurrencies.

**Response (200):**
```json
{
  "cryptos": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 45000,
      "change24h": 2.5,
      "image": "https://example.com/btc.png",
      "createdAt": "2026-05-01T10:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Ethereum",
      "symbol": "ETH",
      "price": 3000,
      "change24h": -1.2,
      "image": "https://example.com/eth.png",
      "createdAt": "2026-05-01T10:05:00Z"
    }
  ]
}
```

---

#### Get Crypto by Symbol (GET `/api/crypto/:symbol`)
Fetch a specific cryptocurrency by symbol.

**Response (200):**
```json
{
  "crypto": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Bitcoin",
    "symbol": "BTC",
    "price": 45000,
    "change24h": 2.5,
    "image": "https://example.com/btc.png",
    "createdAt": "2026-05-01T10:00:00Z"
  }
}
```

**Error (404):**
```json
{
  "message": "Cryptocurrency not found"
}
```

---

#### Create Crypto (POST `/api/crypto`)
Add a new cryptocurrency to the database. (Protected route)

**Request:**
```json
{
  "name": "Bitcoin",
  "symbol": "BTC",
  "price": 45000,
  "change24h": 2.5,
  "image": "https://example.com/btc.png"
}
```

**Response (201):**
```json
{
  "message": "Cryptocurrency created successfully",
  "crypto": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Bitcoin",
    "symbol": "BTC",
    "price": 45000,
    "change24h": 2.5,
    "image": "https://example.com/btc.png",
    "createdAt": "2026-05-01T10:00:00Z"
  }
}
```

**Error (400):**
```json
{
  "message": "All fields are required"
}
```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed with bcryptjs),
  createdAt: Date (default: now)
}
```

### Cryptocurrency Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  symbol: String (required, uppercase),
  price: Number (required, >= 0),
  change24h: Number (required),
  image: String (required, URL),
  createdAt: Date (default: now)
}
```

## 🔐 Authentication

- **Method:** JWT (JSON Web Tokens)
- **Token Expiry:** 7 days
- **Storage:** Clients should store tokens in `localStorage` (key: `cb_auth_token`)
- **Usage:** Include token in request header: `Authorization: Bearer <token>`
- **Password Hashing:** bcryptjs with salt rounds 10

### Example Protected Request:
```bash
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🌐 Environment & Database

### MongoDB Setup

**Option 1: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create a database user
4. Add your IP to the allowlist
5. Copy connection string and add to `.env`

**Option 2: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Then start MongoDB service
mongod
```

Update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/coinbase-clone
```

### Database Fallback

If MongoDB Atlas is unavailable, the server automatically falls back to an in-memory database (`mongo-memory-server`). This allows development to continue without a live database connection. The server will seed default cryptocurrencies on startup.

## 🛠️ Technology Stack

- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **MongoDB** – NoSQL database (with Atlas for cloud hosting)
- **Mongoose** – MongoDB object modeling (ODM)
- **JWT** – Secure token-based authentication
- **bcryptjs** – Password hashing & verification
- **CORS** – Cross-Origin Resource Sharing
- **dotenv** – Environment variable management
- **mongo-memory-server** – In-memory fallback database for development

## 🚀 Deployment

### Deploy to Render (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial backend deployment"
   git push origin main
   ```

2. **Go to Render** → https://render.com

3. **Create new Web Service**
   - Click "New+" → "Web Service"
   - Connect your GitHub account and select this repository

4. **Configure deployment**
   - **Build Command:** `npm install`
   - **Start Command:** `npm run start`
   - **Environment Variables:**
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong random secret (32+ characters)
     - `PORT`: `5000` (or let Render assign)
     - `FRONTEND_URL`: Your frontend's deployed URL (e.g., https://your-frontend.netlify.app)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Your API will be available at `https://your-service-name.onrender.com`

6. **Update Frontend**
   - Update the frontend's `VITE_API_BASE_URL` environment variable to point to your deployed backend URL
   - Redeploy the frontend

### Deploy to Heroku (Alternative)

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Add environment variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-secret-key"
   heroku config:set FRONTEND_URL="https://your-frontend-url"
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## 📋 Seeding Default Data

When the server starts, it automatically seeds 6 default cryptocurrencies if the database is empty:
- Bitcoin (BTC)
- Ethereum (ETH)
- Litecoin (LTC)
- Bitcoin Cash (BCH)
- Ripple (XRP)
- Cardano (ADA)

To manually seed or add cryptos, use the `POST /api/crypto` endpoint (protected route).

## 📝 Development Tips

### Running the Server in Development

```bash
npm run start
```

Or with auto-restart on file changes (requires nodemon):
```bash
npm install --save-dev nodemon
npx nodemon server.js
```

### Testing the API

Use `curl` or Postman to test endpoints:

```bash
# Test server health
curl http://localhost:5000

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'

# Get all cryptos
curl http://localhost:5000/api/crypto
```

### Debugging

Enable detailed logging by adding debug statements to middleware or routes:

```javascript
console.log("Request:", req.method, req.path);
console.log("Headers:", req.headers);
```

## ✨ Features

- ✅ RESTful API design
- ✅ Secure JWT authentication
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ MongoDB database with Atlas + fallback support
- ✅ Protected routes with middleware
- ✅ CORS configured for frontend integration
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Automatic database seeding
- ✅ Production-ready code

## 🐛 Troubleshooting

### Server won't start
- Ensure `PORT` is not in use: `netstat -ano | findstr :5000` (Windows)
- Check `.env` file exists and is properly formatted
- Verify Node.js is installed: `node --version`

### MongoDB connection fails
- Check `MONGODB_URI` is correct in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Server will fall back to in-memory database if connection fails

### CORS errors
- Verify `FRONTEND_URL` in `.env` matches your frontend's URL
- Ensure frontend sends requests to the correct API URL

### Token validation errors
- Check JWT token is included in `Authorization` header
- Ensure `JWT_SECRET` matches between server and token generation
- Verify token hasn't expired (7 day expiry)

## 📞 Support & Docs

- **Express Docs:** https://expressjs.com/
- **MongoDB Docs:** https://docs.mongodb.com/
- **JWT Info:** https://jwt.io/
- **Render Docs:** https://render.com/docs

---

**Interim Assessment Complete** ✅
