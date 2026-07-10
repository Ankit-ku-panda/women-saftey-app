# Women Safety App

## Overview
The Women Safety App is a mobile application designed to provide safety solutions for women. It aims to empower women by providing them with tools and resources to ensure their safety in various situations.

## Features
- **Emergency SOS**: Instantly alert contacts with your location using the SOS feature
- **Real-time Location Sharing**: Share your live location with trusted contacts for added security
- **Local Safety Resources**: Find nearby police stations, hospitals, and other safety resources
- **Personal Safety Tips**: Access safety tips and guidelines tailored for women's safety
- **Panic Button**: A quick-access button that activates alarms and sends alerts
- **Community Support**: Connect with other users and share safety experiences

## Tech Stack
- **Frontend**: React.js (JavaScript)
- **Styling**: CSS
- **Markup**: HTML

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your system

### Installation
1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/Ankit-ku-panda/women-saftey-app.git
   cd women-saftey-app
   ```

2. **Install Dependencies**: 
   ```bash
   npm install
   ```

3. **Run the Application**: 
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

## Usage Guidelines
- Ensure your device's GPS is enabled for location services
- In case of an emergency, press the SOS button to alert your designated contacts
- Regularly update your contact list within the app settings
- Enable notifications to receive real-time safety alerts

## How to Contribute
We welcome contributions! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing
Run tests with:
```bash
npm test
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Safety Notice
This app is designed as a safety tool and should be used in conjunction with official emergency services. In case of immediate danger, always call emergency services first (911 in the US, 100 in India, etc.).

## Contact & Support
For support or bug reports, please open an issue on the GitHub repository.

---

**Made with ❤️ for Women's Safety**

## Docker

Build and run the production image:

```bash
docker build -t women-safety-app .
docker run -p 80:80 women-safety-app
```

For local development with live reload using Docker Compose:

```bash
docker-compose up
```

Notes:
- The production image uses a multi-stage build and serves the optimized React build with nginx on port 80.
- The Compose service mounts the project directory and runs `npm start` for development.

Ngrok (expose localhost)
-------------------------

You can run an `ngrok` tunnel alongside the dev `web` service using Docker Compose. Create a `.env` from `.env.example` and set your `NGROK_AUTHTOKEN`.

```bash
cp .env.example .env
# edit .env and set NGROK_AUTHTOKEN
docker-compose up
```

The `ngrok` service creates a public URL that tunnels to the `web` service and exposes the ngrok web UI at [http://localhost:4040](http://localhost:4040).

If you prefer to run ngrok separately (production or custom setup), install the official ngrok binary and run:

```bash
# example: forward port 80 (production nginx)
ngrok http 80
```

