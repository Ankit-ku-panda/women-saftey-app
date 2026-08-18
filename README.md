# SafeHer — Women Safety App

A responsive women’s safety web application built with React and Firebase. SafeHer provides live location tracking, emergency calling, SOS messaging with Google Maps coordinates, shake-triggered emergency calling, and cloud-based emergency contact management.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Authentication%20%26%20Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

SafeHer is designed to provide quick access to essential emergency tools from a mobile or desktop browser. It uses the browser Geolocation API to track the user’s position and generate a Google Maps location link that can be shared through SMS.

Emergency contacts are stored in Firebase Firestore under an anonymously authenticated user account.

## Features

- Live GPS location tracking
- Embedded Google Maps location preview
- Direct police call button
- Direct women’s helpline call button
- SOS SMS containing current coordinates and a Google Maps link
- Shake-triggered emergency calling on supported mobile devices
- Emergency contact addition and removal
- Firebase anonymous authentication
- Firebase Firestore contact storage
- Responsive interface for mobile and desktop
- Docker and Docker Compose support
- Optional ngrok tunnel for testing on external devices

## Emergency Numbers

The current application is configured for India:

| Service | Number |
|---|---:|
| Police | 100 |
| Women’s Helpline | 1091 |

If you deploy the application in another country or region, update these constants in `src/WomenSafetyHome.jsx`:

```javascript
const POLICE_NUMBER = "100";
const HELPLINE_NUMBER = "1091";
```

## Tech Stack

- React 19
- JavaScript
- CSS
- Firebase Authentication
- Cloud Firestore
- Browser Geolocation API
- Device Motion API
- Google Maps Embed
- Docker
- Nginx
- ngrok

## Project Structure

```text
women-saftey-app/
├── public/
├── src/
│   ├── App.js
│   ├── LoginPage.jsx
│   ├── WomenSafetyHome.jsx
│   ├── WomenSafetyHome.css
│   ├── firebase.js
│   └── index.js
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- A Firebase project
- Docker Desktop, if you want to use Docker
- An ngrok account, if you want to expose the local development server

## Installation

Clone the repository:

```bash
git clone https://github.com/Ankit-ku-panda/women-saftey-app.git
cd women-saftey-app
```

Install the dependencies:

```bash
npm install
```

## Firebase Configuration

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Register a Web application.
3. Enable **Anonymous Authentication**:

   ```text
   Firebase Console → Authentication → Sign-in method → Anonymous → Enable
   ```

4. Create a Cloud Firestore database.
5. Copy the Firebase web configuration into `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

Do not commit private administrative credentials or service-account keys. Firebase client configuration is intended for web applications, but access must still be protected with appropriate Firebase Authentication and Firestore Security Rules.

## Run Locally

Start the development server:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

The browser will request location permission when live tracking is started.

## Production Build

Create an optimized build:

```bash
npm run build
```

The generated files will be placed in the `build` directory.

## Run Tests

```bash
npm test
```

## Docker

Build the production image:

```bash
docker build -t women-safety-app .
```

Run the container:

```bash
docker run --name women-safety-app -p 8080:80 women-safety-app
```

Open:

```text
http://localhost:8080
```

## Docker Compose and ngrok

Copy the example environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Add your ngrok authentication token to `.env`:

```env
NGROK_AUTHTOKEN=your_ngrok_authtoken_here
```

Start the development server and ngrok tunnel:

```bash
docker compose up
```

The application will be available at:

```text
http://localhost:3000
```

The ngrok inspection interface will be available at:

```text
http://localhost:4040
```

## Browser Permissions

SafeHer requires browser access to:

- Location, for live GPS tracking
- Device motion, for shake emergency detection
- Telephone and SMS handlers on supported mobile devices

Geolocation generally requires either `localhost` or a secure HTTPS connection. Shake detection availability depends on the browser, device, and operating-system permission settings.

## Current Limitations

- SOS messages open the device’s SMS application; the web app does not send messages silently.
- Telephone buttons require a device or application capable of handling `tel:` links.
- Shake detection is not supported by every browser or desktop device.
- The SOS message currently uses the first saved emergency contact.
- The application is a safety-assistance prototype and is not a replacement for emergency services.
- Continuous location tracking may increase battery usage.

## Safety Notice

SafeHer is an educational safety-assistance project. It does not guarantee emergency response, message delivery, location accuracy, or availability.

In an immediate emergency, contact the appropriate local emergency service directly.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

For bugs and feature requests, use the repository’s [Issues page](https://github.com/Ankit-ku-panda/women-saftey-app/issues).

## Author

**Ankit Kumar Panda**

- GitHub: [Ankit-ku-panda](https://github.com/Ankit-ku-panda)
- Repository: [women-saftey-app](https://github.com/Ankit-ku-panda/women-saftey-app)

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

Made with care for safer and more accessible emergency assistance.
