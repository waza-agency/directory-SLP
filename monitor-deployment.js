const https = require('https');

async function checkAccountPage() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'sanluisway.com',
            port: 443,
            path: '/account',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        };

        const req = https.request(options, (res) => {
            resolve(res.statusCode);
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.end();
    });
}

async function checkBusinessDashboard() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'sanluisway.com',
            port: 443,
            path: '/business/dashboard',
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        };

        const req = https.request(options, (res) => {
            resolve(res.statusCode);
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.end();
    });
}

async function monitorDeployment() {
    console.log('🔍 Monitoring deployment status...\n');

    let attempts = 0;
    const maxAttempts = 20; // Monitor for about 10 minutes (30s intervals)

    while (attempts < maxAttempts) {
        attempts++;
        const timestamp = new Date().toLocaleTimeString();

        try {
            console.log(`[${timestamp}] Attempt ${attempts}/${maxAttempts}`);

            // Check both problematic pages
            const [accountStatus, dashboardStatus] = await Promise.all([
                checkAccountPage().catch(() => 'ERROR'),
                checkBusinessDashboard().catch(() => 'ERROR')
            ]);

            console.log(`  /account: ${accountStatus === 200 ? '✅ 200' : accountStatus === 500 ? '❌ 500' : '⚠️ ' + accountStatus}`);
            console.log(`  /business/dashboard: ${dashboardStatus === 200 ? '✅ 200' : dashboardStatus === 500 ? '❌ 500' : '⚠️ ' + dashboardStatus}`);

            // Check if deployment is complete
            if (accountStatus === 200 && dashboardStatus === 200) {
                console.log('\n🎉 Deployment successful! Both pages are now working.');
                return true;
            }

            // If still getting 500 errors, continue monitoring
            if (accountStatus === 500 || dashboardStatus === 500) {
                console.log('  Still getting 500 errors, waiting for deployment...');
            }

        } catch (error) {
            console.log(`  Error checking pages: ${error.message}`);
        }

        if (attempts < maxAttempts) {
            console.log('  Waiting 30 seconds before next check...\n');
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
    }

    console.log('\n⏰ Monitoring timeout reached. Deployment may still be in progress.');
    console.log('Please check manually or wait a bit longer.');
    return false;
}

async function main() {
    console.log('🚀 Starting deployment monitoring...');
    console.log('This will check every 30 seconds for up to 10 minutes.\n');

    const success = await monitorDeployment();

    if (success) {
        console.log('\n✅ Monitoring complete - deployment successful!');
    } else {
        console.log('\n⚠️ Monitoring complete - please check manually');
        console.log('You can run this script again or check https://sanluisway.com/account directly');
    }
}

main().catch(console.error);