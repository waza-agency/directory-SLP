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

# Directory SLP - Database Setup

This document provides instructions for setting up and managing the database for the Directory SLP application.

## Prerequisites

- Node.js (v14 or higher)
- Supabase account

## Database Setup

1. Install dependencies:
```bash
npm install
```

2. Setup your Supabase environment variables in the `.env` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

The application uses Supabase for data storage with the following main tables:

### Places
- Stores information about locations in San Luis Potosí
- Includes fields for name, category, address, contact info, and more
- Supports featured places and ratings

### Events
- Manages upcoming events and activities
- Includes fields for title, dates, location, and category
- Can be associated with specific places

### Photos
- Stores images for both places and events
- Supports featured photos
- Includes alt text for accessibility

### Tags
- Provides categorization for places and events
- Enables flexible filtering and search

### Reviews
- Stores user reviews for places
- Includes rating and text content

### FeaturedPhotos
- Manages homepage featured images
- Supports titles, subtitles, and links

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key for maps integration

## Best Practices

1. Use Supabase Studio for database management
2. Keep the schema in sync with the application needs
3. Regularly backup the database
4. Use environment variables for sensitive information 