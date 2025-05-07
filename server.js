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
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) {
      if (err.code === 'EADDRINUSE') {
        console.log('Port 3000 is in use, trying port 3001');
        createServer((req, res) => {
          const parsedUrl = parse(req.url, true);
          handle(req, res, parsedUrl);
        }).listen(3001, (err2) => {
          if (err2) throw err2;
          console.log('> Ready on http://localhost:3001');
        });
      } else {
        throw err;
      }
    } else {
      console.log('> Ready on http://localhost:3000');
    }
  });
}); 