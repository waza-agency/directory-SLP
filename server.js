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
console.log('Using performance API polyfill:', !process.version.startsWith('v16') && !process.version.startsWith('v18'));

// Import and run Next.js
const express = require('express');
const next = require('next');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3007', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Add health check endpoint
  server.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Add error handling middleware
  server.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: dev ? err.message : 'Something went wrong'
    });
  });

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log('Environment:', process.env.NODE_ENV);
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});