# San Luis Potosí Directory

A responsive web application that displays a directory of places in San Luis Potosí, Mexico. The data is sourced from a Google Sheet and the application supports both English and Spanish languages.

## Features

- Responsive design that works on mobile and desktop
- Internationalization (English and Spanish)
- Filter places by category
- Search functionality
- Integration with Google Sheets for data management
- Docker support for easy deployment

## Getting Started

### Prerequisites

- Node.js 18 or later
- Google Sheets API credentials
- Docker (optional, for containerized deployment)

### Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```

2. Fill in your Google Sheets API credentials in the `.env` file:
   ```
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_CLIENT_EMAIL=your_client_email_here
   GOOGLE_PRIVATE_KEY="your_private_key_here"
   GOOGLE_SHEET_ID=1xZY2TRiXNOczzbE9AxeRRMzgPIMG4lepOG1ywl4milo
   ```

### Development

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```
npm run build
npm start
```

### Docker Deployment

1. Build and start the Docker container:
   ```
   docker-compose up -d
   ```

2. The application will be available at [http://localhost:3000](http://localhost:3000).

## Google Sheet Structure

The application expects the Google Sheet to have the following columns:

1. ID
2. Name
3. Category
4. Address
5. Phone (optional)
6. Website (optional)
7. Instagram (optional)
8. Latitude (optional)
9. Longitude (optional)
10. Description (optional)
11. Image URL (optional)

## Internationalization

The application supports English and Spanish languages. You can add more languages by:

1. Adding a new locale folder in `public/locales/`
2. Adding the locale to the `next-i18next.config.js` file

## License

 