// Add polyfill for the performance API if needed, but only for Node.js <16
// Modern Node.js versions (18+) have a native performance API
if (!global.performance) {
  console.log('Adding performance API polyfill for older Node.js version...');
  const startTime = Date.now();
  const marks = {};

  global.performance = {
    mark: (name) => {
      marks[name] = Date.now() - startTime;
    },
    measure: (name, startMark, endMark) => {
      if (marks[startMark] && marks[endMark]) {
        marks[name] = marks[endMark] - marks[startMark];
      }
    },
    getEntriesByName: (name) => {
      return marks[name] ? [{ name, startTime: marks[name] }] : [];
    },
    getEntriesByType: () => [],
    clearMarks: () => {
      Object.keys(marks).forEach(key => delete marks[key]);
    },
    clearMeasures: () => {},
    now: () => Date.now() - startTime,
    timeOrigin: startTime
  };
} else {
  console.log('Using native performance API (modern Node.js)');
}

console.log('Node.js version:', process.version);
console.log('Environment:', process.env.NODE_ENV);

// For standalone mode, we need to use the built-in Next.js server
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Check if BUILD_ID exists, if not, we need to run in development mode
const buildIdPath = path.join(__dirname, '.next', 'BUILD_ID');
const hasBuildId = fs.existsSync(buildIdPath);

// Force development mode if BUILD_ID is missing (due to build issues)
const dev = process.env.NODE_ENV !== 'production' || !hasBuildId;
if (!hasBuildId && process.env.NODE_ENV === 'production') {
  console.log('Warning: BUILD_ID missing, running in development mode despite NODE_ENV=production');
}

const hostname = '0.0.0.0'; // Changed from localhost to 0.0.0.0 for Docker
const port = parseInt(process.env.PORT || '3000', 10); // Changed default to 3000

console.log(`Starting server on ${hostname}:${port} (development: ${dev})`);

const app = next({ dev, hostname, port, dir: './' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      // Add health check endpoint
      if (parsedUrl.pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
          developmentMode: dev,
          hasBuildId: hasBuildId,
          version: process.env.npm_package_version || '1.0.0'
        }));
        return;
      }

      // Handle all other routes with Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
  .once('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  })
  .listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Mode: ${dev ? 'development' : 'production'}`);
    console.log(`> Build ID present: ${hasBuildId}`);
    console.log('> Press Ctrl+C to stop');
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});