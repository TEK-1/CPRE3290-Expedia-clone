# OdysCy

<img width="1024" height="1024" alt="odyscy-logo" src="https://github.com/user-attachments/assets/0a9088de-ce48-4433-ac7b-f8f5dbadfc98" />

OdysCy is a travel booking web application - a clone of Expedia.com - where users can search and book flights and hotels, explore destinations, and manage bookings through an admin panel. Built with React, Redux, Chakra UI, and Firebase Authentication, with a mock REST API layer for flight and hotel data.

This project is forked and adapted from the original [Expedia-clone](https://github.com/kumkumdutta/Expedia-clone) by Kumkum Dutta et al., with authentication, search flow, pricing, and branding changes described below.

## Features

- User signup and login via phone number + OTP verification (Firebase Authentication)
- Flight search by origin, destination, and date across supported cities
- Price and class filtering on search results
- Hotel search and booking
- Shopping cart / checkout flow for flight bookings
- Admin panel for managing flight and hotel listings
- Responsive UI (Chakra UI) with light/dark mode support

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Create React App), Redux, React Router |
| UI | Chakra UI |
| Authentication | Firebase Authentication (Phone/OTP) |
| Mock backend / data | json-server |
| HTTP client | Axios |
| Deployment | Vercel |

## Prerequisites

- [Node.js](https://nodejs.org) v18.x (recommended — later versions may hit dependency install issues with this project's older packages)
- npm (bundled with Node)
- A free [Firebase](https://console.firebase.google.com) account

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/CPRE3290-Expedia-clone.git
cd CPRE3290-Expedia-clone
```

### 2. Install dependencies

```bash
npm install
```

If you hit peer-dependency errors (common with this project's Chakra UI/React versions), retry with:

```bash
npm install --legacy-peer-deps
```

`json-server` is a separate dependency required for local mock data. If `npm run server` later fails with `command not found`, install it explicitly:

```bash
npm install json-server@0.17.4 --save-dev
```

### 3. Set up your own Firebase project

The app uses Firebase Authentication with phone number + OTP verification. You need your own Firebase project. 
Do NOT reuse credentials from the original repo.

1. Go to the [Firebase Console](https://console.firebase.google.com) → **Add project**.
2. Go to **Build → Authentication → Get Started → Sign-in method** → enable **Phone**.
3. Under the same Phone provider settings, add a **test phone number** (e.g., `+1 650-555-1234` with code `123456`) this lets you test OTP login without sending real SMS, and avoids Firebase's SMS region policy blocking untested countries.
4. Go to **Project Settings → General → Your apps → Add app → Web app**, and copy the generated `firebaseConfig` object.
5. Open `src/01_firebase/config_firebase.js` and replace the existing `firebaseConfig` values with your own.

> **Note:** ensure the initialized Firebase app instance is exported as `export default app;` (or whatever variable name you assign `initializeApp(firebaseConfig)` to) — a mismatched export/import name here is a common source of "module has no exports" build errors.

### 4. Environment variables

Copy the example environment file and fill in any required values:

```bash
cp .env.example .env
```

`.env` is gitignored and should never be committed — see `.env.example` for the variable names your setup requires.

### 5. Run locally

Two processes are required, in separate terminals:

```bash
# Terminal 1 — React dev server (http://localhost:3000)
npm start

# Terminal 2 — mock API server (http://localhost:8080)
npm run server
```

Both must be running for the app to function — the React frontend fetches flight/hotel data from json-server.

### 6. Build for production

```bash
npm run build
```

Outputs an optimized static build to `/build`.

## Project Structure

```
src/
├── 01_firebase/       # Firebase config and initialization
├── Components/        # Shared UI (Navbar, Footer, etc.)
├── Pages/
│   ├── Flights/        # Flight search, results, filtering
│   ├── Stay/            # Hotel search
│   ├── Admin/           # Admin dashboard and listing management
│   ├── ThingsTodo/    # Destination exploration
│   ├── Login.jsx
│   └── Register.jsx
├── Redux/                # Actions, reducers, action types
└── App.js
db.json                    # Mock data (flights, hotels, cart) served by json-server
```

## Changes Made From the Original Fork

This fork includes the following fixes and changes on top of the original repository:

- **Firebase re-configuration** — replaced hardcoded credentials with a dedicated project, fixed a config export/import mismatch, and configured phone-based OTP authentication with a test number for reliable local testing.
- **Rebranding** — renamed the project to OdysCy, replaced the logo and favicon, updated the page title/manifest, and restyled the navigation bar.
- **Search flow fix** — the homepage flight search previously discarded user input on submit instead of passing it to the results page. Search criteria now persist across navigation via URL query parameters.
- **Price filtering fix** — converted price filter brackets from INR to USD and corrected a range-calculation bug that caused search results to be filtered out by default.
- **Mock data update** — replaced the original India-route flight inventory with routes across five supported cities: Des Moines, Chicago, Minneapolis, San Francisco, and Boston.
- **Cart endpoint fix** — corrected a port mismatch that caused "Book Now" to silently fail, and added visible success/error feedback.

## Known Limitations / Future Work

- No live third-party flight data API is currently integrated (see Final Report for context — Amadeus's free developer tier was decommissioned mid-project). Flight data is served from local mock data via json-server.
- No automated test suite yet.
- `json-server` is file-based and not intended for concurrent production use; a real database is recommended for any deployment beyond a demo.
- No payment processing is integrated; "Book Now" adds to a mock cart only.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

## License

This project is provided for educational purposes as part of Iowa State University of Science and Technology's CPRE 3290 course. See the original [Expedia-clone](https://github.com/kumkumdutta/Expedia-clone) repository for upstream licensing context.
