const https = require('https');

async function testAccountPage() {
    console.log('🔍 Testing account page...');

    const options = {
        hostname: 'sanluisway.com',
        port: 443,
        path: '/account',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            console.log(`Status Code: ${res.statusCode}`);
            console.log(`Headers:`, res.headers);

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 500) {
                    console.log('\n❌ Server returned 500 error');
                    console.log('Response body (first 1000 chars):');
                    console.log(data.substring(0, 1000));

                    // Look for specific error patterns
                    if (data.includes('getStaticProps')) {
                        console.log('\n🔍 Found getStaticProps in error - this might be the issue');
                    }
                    if (data.includes('getServerSideProps')) {
                        console.log('\n✅ Found getServerSideProps in response');
                    }
                    if (data.includes('Internal Server Error')) {
                        console.log('\n❌ Generic internal server error detected');
                    }
                } else {
                    console.log(`\n✅ Page loaded successfully with status ${res.statusCode}`);
                }

                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });

        req.on('error', (error) => {
            console.error('Request error:', error);
            reject(error);
        });

        req.setTimeout(10000, () => {
            console.log('Request timeout');
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

// Test other pages for comparison
async function testOtherPages() {
    const pages = ['/', '/signin', '/business/dashboard'];

    for (const page of pages) {
        console.log(`\n🔍 Testing ${page}...`);
        try {
            const options = {
                hostname: 'sanluisway.com',
                port: 443,
                path: page,
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                }
            };

            await new Promise((resolve, reject) => {
                const req = https.request(options, (res) => {
                    console.log(`${page}: Status ${res.statusCode}`);
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => resolve());
                });
                req.on('error', reject);
                req.setTimeout(5000, () => {
                    req.destroy();
                    reject(new Error('Timeout'));
                });
                req.end();
            });
        } catch (error) {
            console.log(`${page}: Error - ${error.message}`);
        }
    }
}

async function main() {
    try {
        console.log('🚀 Starting account page diagnostics...\n');

        // Test the account page
        await testAccountPage();

        // Test other pages for comparison
        await testOtherPages();

        console.log('\n✅ Diagnostics complete');
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

main();