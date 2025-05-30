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
const app = next({ dev });
const handle = app.getRequestHandler();

// Get port from command line arguments or use default 3000
const args = process.argv.slice(2);
let port = 3000;
const portIndex = args.indexOf('-p');
if (portIndex !== -1 && args[portIndex + 1]) {
  port = parseInt(args[portIndex + 1], 10);
}

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});