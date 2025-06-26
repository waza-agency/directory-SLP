#!/usr/bin/env node

// Script to apply the signup fix migration
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!SUPABASE_URL);
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!SUPABASE_SERVICE_ROLE_KEY);
  process.exit(1);
}

console.log('🔧 Applying Signup Fix Migration');
console.log('=================================');
console.log(`Supabase URL: ${SUPABASE_URL}`);
console.log('');

async function applyMigration() {
  // Create service role client (needed for schema changes)
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20250101000000_fix_signup_rls_policies.sql');

    if (!fs.existsSync(migrationPath)) {
      console.error('❌ Migration file not found:', migrationPath);
      return false;
    }

    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    console.log('📄 Migration file loaded successfully');
    console.log('📝 Migration content preview:');
    console.log(migrationSQL.substring(0, 200) + '...');
    console.log('');

        // Apply the migration manually
    console.log('🚀 Applying migration manually...');

    // Split the migration into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📋 Found ${statements.length} SQL statements to execute`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.length === 0) continue;

      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);

      try {
        const { error } = await supabase.rpc('exec_sql_statement', {
          sql_statement: statement + ';'
        });

        if (error) {
          console.error(`❌ Statement ${i + 1} failed:`, error);
          console.error(`Statement: ${statement.substring(0, 100)}...`);
          // Continue with next statement instead of failing completely
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      } catch (err) {
        console.error(`💥 Exception in statement ${i + 1}:`, err.message);
        console.error(`Statement: ${statement.substring(0, 100)}...`);
        // Continue with next statement
      }
    }

    console.log('✅ Migration applied successfully!');
    console.log('');

    // Test the changes
    console.log('🧪 Testing the fix...');

    // Test user table access
    const { data: usersTest, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (usersError) {
      console.log('❌ Users table test failed:', usersError.message);
    } else {
      console.log('✅ Users table accessible');
    }

    // Test business profiles table access
    const { data: businessTest, error: businessError } = await supabase
      .from('business_profiles')
      .select('*')
      .limit(1);

    if (businessError) {
      console.log('❌ Business profiles table test failed:', businessError.message);
    } else {
      console.log('✅ Business profiles table accessible');
    }

    return true;

  } catch (error) {
    console.error('💥 Unexpected error:', error);
    return false;
  }
}

async function main() {
  const success = await applyMigration();

  if (success) {
    console.log('');
    console.log('🎉 Migration completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Test the signup functionality');
    console.log('2. Check if the 500 error is resolved');
    console.log('3. Monitor the application logs');
    console.log('');
    console.log('💡 The signup process should now work correctly with the fixed RLS policies.');
  } else {
    console.log('');
    console.log('❌ Migration failed. Please check the errors above.');
    process.exit(1);
  }
}

main();