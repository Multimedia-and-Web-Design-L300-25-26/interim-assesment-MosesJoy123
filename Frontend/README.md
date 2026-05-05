# Coinbase Clone – Frontend

React + Vite single-page application for cryptocurrency trading platform. Features user authentication, crypto browsing, and profile management.

## Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── common/           # Common UI components (Button, SectionHeading)
│   │   ├── crypto/           # Crypto-related components (CryptoTable, CryptoRow)
│   │   └── layout/           # Layout components (Navbar, Footer)
│   ├── pages/                # Route pages
│   │   ├── Home.jsx
│   │   ├── SignUp.jsx
│   │   ├── SignIn.jsx
│   │   ├── Profile.jsx
│   │   ├── Explore.jsx
│   │   ├── AssetDetail.jsx
│   │   ├── Learn.jsx
│   │   └── AddCrypto.jsx
│   ├── data/                 # Static data (siteData.js)
│   ├── utils/                # Utility functions (validation.js, etc.)
│   ├── assets/               # Images and media
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Global styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Global CSS
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
├── eslint.config.js          # ESLint rules
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14+)
- **npm** or yarn
- A running backend API (see backend README)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/frontend-repo.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env`):
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   
   For production, update to your deployed backend URL:
   ```
   VITE_API_BASE_URL=https://your-backend-api.onrender.com/api
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   App runs on `http://localhost:5174`

## 📱 Pages & Features

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured cryptocurrencies and hero section |
| Explore | `/explore` | Browse all available cryptocurrencies with real-time data |
| Asset Detail | `/asset/:symbol` | Detailed view of a specific cryptocurrency |
| Learn | `/learn` | Educational resources about cryptocurrency |
| Sign Up | `/signup` | Create a new user account |
| Sign In | `/signin` | Authenticate with existing credentials |

### Protected Pages (Requires Authentication)

| Page | Route | Description |
|------|-------|-------------|
| Profile | `/profile` | View and edit user profile information |
| Add Crypto | `/admin/crypto` | Admin form to add new cryptocurrencies (protected) |

## 🔐 Authentication Flow

1. **Sign Up**: User registers with name, email, and password
   - Endpoint: `POST /api/auth/register`
   - Token stored in `localStorage` (key: `cb_auth_token`)
   - User info stored (key: `cb_auth_user`)

2. **Sign In**: User logs in with email and password
   - Endpoint: `POST /api/auth/login`
   - JWT token returned and stored in localStorage
   - Redirects to Profile or Home

3. **Protected Routes**: Check localStorage for token
   - If no token found, redirect to Sign In
   - Component: `src/components/common/ProtectedRoute.jsx`

4. **Logout**: Clear localStorage and redirect to Home
   - Button available in Navbar

## 🛠️ Technology Stack

- **React 19** – JavaScript library for UIs
- **Vite** – Fast build tool and dev server
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first CSS framework
- **Fetch API** – HTTP requests to backend

## 🎨 Components

### Layout Components

- **Navbar** (`src/components/layout/Navbar.jsx`)
  - Navigation menu
  - Auth status display
  - Sign In / Sign Out buttons
  - Links to Home, Explore, Learn

- **Footer** (`src/components/layout/Footer.jsx`)
  - Footer content with links and info

### Common Components

- **Button** (`src/components/common/Button.jsx`)
  - Reusable button component with variants

- **SectionHeading** (`src/components/common/SectionHeading.jsx`)
  - Section title component

- **ProtectedRoute** (`src/components/common/ProtectedRoute.jsx`)
  - Wrapper for protected pages
  - Checks localStorage token
  - Redirects to Sign In if not authenticated

### Crypto Components

- **CryptoTable** (`src/components/crypto/CryptoTable.jsx`)
  - Displays list of cryptocurrencies in table format
  - Columns: Name, Symbol, Price, 24h Change, Market Cap

- **CryptoRow** (`src/components/crypto/CryptoRow.jsx`)
  - Individual crypto entry in table
  - Clickable to navigate to Asset Detail page

## 🔄 API Integration

All API calls use `VITE_API_BASE_URL` environment variable.

### Authentication Endpoints

```javascript
// Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Crypto Endpoints

```javascript
// Get all cryptos
GET /api/crypto

// Get crypto by symbol
GET /api/crypto/:symbol

// Create new crypto (protected)
POST /api/crypto
{
  "name": "Bitcoin",
  "symbol": "BTC",
  "price": 45000,
  "change24h": 2.5,
  "image": "https://example.com/btc.png"
}
```

### Profile Endpoints (Protected)

```javascript
// Get user profile
GET /api/profile
Headers: { Authorization: "Bearer <token>" }

// Update user profile
PUT /api/profile
Headers: { Authorization: "Bearer <token>" }
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

## 📝 Form Validation

Utility functions in `src/utils/validation.js`:

- `validateEmail()` – RFC 5322 email format
- `validateName()` – Name length and format
- `validatePassword()` – Strong password requirements (8+ chars, uppercase, number, symbol)
- `validatePasswordMatch()` – Confirm password matches
- `validateSymbol()` – Crypto symbol format (uppercase, 1-10 chars)
- `validatePositiveNumber()` – Non-negative numbers
- `validateImageUrl()` – Valid image URL

All forms (Sign Up, Sign In, Profile, Add Crypto) use these validators with inline error messages.

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build locally
npm run preview
```

## 🌐 Deployment

### Deploy to Netlify (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Frontend: React Vite app"
   git push origin main
   ```

2. **Go to Netlify** → https://app.netlify.com

3. **Create new site from Git**
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository

4. **Configure build settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

5. **Add environment variables**
   - Go to Site settings → Build & deploy → Environment
   - Add `VITE_API_BASE_URL` with your deployed backend URL
   - Example: `https://your-backend-api.onrender.com/api`

6. **Deploy**
   - Netlify automatically deploys on every push to main
   - Your site URL: `https://your-site-name.netlify.app`

### Deploy to Vercel (Alternative)

1. **Go to Vercel** → https://vercel.com

2. **Import project**
   - Click "Add new..." → "Project"
   - Select your GitHub repository

3. **Configure**
   - **Framework Preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

4. **Environment variables**
   - Add `VITE_API_BASE_URL` pointing to your backend

5. **Deploy**
   - Click "Deploy"
   - Live at Vercel-assigned URL

### Update Backend URL After Deployment

After deploying the backend (e.g., to Render), update the frontend:

1. Add environment variable in Netlify/Vercel:
   ```
   VITE_API_BASE_URL=https://your-deployed-backend.onrender.com/api
   ```

2. Trigger redeploy by pushing a commit or manually redeploying

## 🐛 Troubleshooting

### App won't start (`npm run dev` fails)

- **Issue:** Module not found
  - **Fix:** Run `npm install` to ensure all dependencies are installed

- **Issue:** Port 5174 already in use
  - **Fix:** Kill the process or configure Vite to use a different port:
    ```bash
    npm run dev -- --port 5175
    ```

### API requests fail (CORS errors)

- **Issue:** Backend not running
  - **Fix:** Start backend server (see backend README)

- **Issue:** Wrong API URL in `.env`
  - **Fix:** Check `VITE_API_BASE_URL` matches your backend URL

- **Issue:** Backend CORS not configured for frontend origin
  - **Fix:** Update backend `FRONTEND_URL` environment variable

### Sign In redirects to /signin after login

- **Issue:** Token not saved to localStorage
  - **Fix:** Check browser console for errors and ensure Sign In request succeeds

- **Issue:** Token expired
  - **Fix:** Tokens expire after 7 days; user needs to sign in again

### Crypto data doesn't load

- **Issue:** Backend API not returning data
  - **Fix:** Check backend is running and cryptos are seeded

- **Issue:** CORS error
  - **Fix:** Verify `VITE_API_BASE_URL` is correct and backend allows requests

## 📊 Local Development with Backend

Run frontend and backend together:

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

Then visit `http://localhost:5174` in your browser.

## 🔗 Related Documentation

- [Backend README](../backend/README.md) – Backend setup and API docs
- [Vite Docs](https://vitejs.dev/) – Build tool documentation
- [React Router Docs](https://reactrouter.com/) – Routing library
- [Tailwind CSS Docs](https://tailwindcss.com/) – Styling framework
- [ESLint Docs](https://eslint.org/) – Linting configuration

## 📞 Support

For frontend-specific issues, check:
- Browser console for JavaScript errors
- Network tab in DevTools for API errors
- Make sure backend is running and accessible
- Verify environment variables are set correctly

For general issues, see the main project README.
