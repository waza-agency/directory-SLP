FROM node:18-alpine

WORKDIR /app

# First copy package files and scripts directory
COPY package.json package-lock.json ./
COPY scripts ./scripts

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Remove test files from pages directory to avoid Next.js build errors
RUN find ./src/pages -name "*.test.*" -delete && \
    find ./src/pages/__tests__ -type f -delete

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
