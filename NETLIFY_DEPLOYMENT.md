# Deploying to Netlify

This document provides instructions for deploying this Next.js project on Netlify.

## Setup Instructions

1. **Create a Netlify account** at [netlify.com](https://netlify.com) if you don't already have one.

2. **Connect your GitHub repository** to Netlify:
   - Click "Add new site" > "Import an existing project"
   - Choose GitHub as your Git provider
   - Authorize Netlify to access your GitHub account
   - Select your repository

3. **Configure build settings**:
   - **Base directory**: Leave empty (or specify `.` for the root directory)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

4. **Environment Variables**:
   Add the following environment variables in Netlify's site settings:

   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key
   DEFAULT_LOCATION=22.1565,-100.9855
   DEFAULT_RADIUS=15000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   For sensitive variables like:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_CREDENTIALS_PATH`
   - `OPENAI_API_KEY`
   - `PERPLEXITY_API_KEY`

   Only add these if they're needed for the build process, and ensure they're kept secure.

5. **Deploy**:
   - Click "Deploy site"
   - Wait for the build and deployment to complete

## Troubleshooting

- If you encounter any issues with Next.js routing, ensure the Netlify Next.js plugin is correctly installed
- Check build logs for any errors

## Continuous Deployment

Netlify automatically sets up continuous deployment from your connected GitHub repository. Any push to the main branch will trigger a new build and deployment. 