const fs = require('fs');
const https = require('https');

// We can't directly access the shared image, so we'll use a placeholder
// The actual image will need to be manually saved to public/images/backgrounds/blue-pattern.jpg
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

// For demonstration, we'll download a sample image
// In your actual implementation, save the shared image manually to the path below
console.log("This script demonstrates the image download process.");
console.log("For the pattern image shared by the user, please save it manually to:");
console.log("public/images/backgrounds/blue-pattern.jpg");

// Example download of a placeholder image (optional)
// downloadImage('https://example.com/sample.jpg', 'public/images/backgrounds/blue-pattern.jpg')
//     .then(() => console.log("Download completed"))
//     .catch(console.error); 