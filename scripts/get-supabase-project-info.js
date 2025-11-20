const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://omxporaecrqsqhzjzvnx.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9teHBvcmFlY3Jxc3Foemp6dm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjg4MjMzMCwiZXhwIjoyMDU4NDU4MzMwfQ.a0fim94nAPcY322BBsB-5rdJNEP7YDsO-7O5wgMS6JA';

async function getProjectInfo() {
  console.log('Supabase Project Information:\n');
  console.log('Project URL:', supabaseUrl);
  console.log('Project Reference:', 'omxporaecrqsqhzjzvnx');

  // Try to get project details from the JWT token
  try {
    const base64Url = supabaseServiceKey.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString('ascii')
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    console.log('\nJWT Token Information:');
    console.log('- Issuer:', payload.iss);
    console.log('- Project Reference:', payload.ref);
    console.log('- Role:', payload.role);
    console.log('- Issued At:', new Date(payload.iat * 1000).toISOString());
    console.log('- Expires At:', new Date(payload.exp * 1000).toISOString());
  } catch (err) {
    console.error('Error decoding JWT:', err.message);
  }

  console.log('\nNote: To get organization/account owner information, you need to:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Log in with the account that owns this project');
  console.log('3. Find project "omxporaecrqsqhzjzvnx" in your projects list');
  console.log('4. Check Settings > General for organization details');
}

getProjectInfo();
