const express = require('express');
const path = require('path');
const fs = require('fs');

console.log('Node.js version:', process.version);
console.log('Environment:', process.env.NODE_ENV);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const hostname = '0.0.0.0';

// Serve static files from the out directory
app.use(express.static('out'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mode: 'static',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Handle all routes - serve index.html for client-side routing
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'out', req.path);

  // Check if the exact file exists (for .html files)
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
    return;
  }

  // Check if file exists with .html extension
  const htmlPath = path.join(__dirname, 'out', req.path + '.html');
  if (fs.existsSync(htmlPath)) {
    res.sendFile(htmlPath);
    return;
  }

  // Check if it's a directory with index.html
  const indexPath = path.join(__dirname, 'out', req.path, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
    return;
  }

  // Default fallback to main index.html
  const defaultIndex = path.join(__dirname, 'out', 'index.html');
  if (fs.existsSync(defaultIndex)) {
    res.sendFile(defaultIndex);
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(port, hostname, () => {
  console.log(`> Static server ready on http://${hostname}:${port}`);
  console.log(`> Serving files from: ${path.join(__dirname, 'out')}`);
  console.log('> Press Ctrl+C to stop');
});