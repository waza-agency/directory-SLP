import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DOCTYPE Test - San Luis Way</title>
</head>
<body>
  <h1>DOCTYPE Test</h1>
  <p>If you see this page without any quirks mode warnings, the DOCTYPE is working correctly.</p>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const mode = document.compatMode;
      const result = document.getElementById('result');
      if (mode === 'CSS1Compat') {
        result.innerHTML = '<span style="color: green;">✅ Standards Mode - DOCTYPE working correctly!</span>';
        result.style.background = '#d4edda';
        result.style.border = '1px solid #c3e6cb';
      } else {
        result.innerHTML = '<span style="color: red;">❌ Quirks Mode - DOCTYPE issue detected!</span>';
        result.style.background = '#f8d7da';
        result.style.border = '1px solid #f5c6cb';
      }
      result.style.padding = '10px';
      result.style.borderRadius = '5px';
      result.style.margin = '20px 0';
    });
  </script>
  <div id="result">Checking document mode...</div>
  <p><a href="/">← Back to Home</a></p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(testHtml);
}