import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local file');
  console.error('Required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  try {
    // Test basic connection by counting subscribers
    const { count, error: countError } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact' });
    
    if (countError) {
      throw new Error(`Database connection error: ${countError.message}`);
    }
    
    console.log('✅ Successfully connected to Supabase');
    console.log(`Current subscriber count: ${count || 0}`);

    // Test subscriber creation
    const testEmail = `test_${Date.now()}@example.com`;
    const { data: subscriber, error: createError } = await supabase
      .from('subscribers')
      .insert([{
        email: testEmail,
        first_name: 'Test User'
      }])
      .select()
      .single();

    if (createError) {
      throw new Error(`Failed to create test subscriber: ${createError.message}`);
    }

    console.log('✅ Successfully created test subscriber');
    console.log('Subscriber details:', subscriber);

    // Clean up test data
    const { error: deleteError } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', subscriber.id);

    if (deleteError) {
      throw new Error(`Failed to clean up test data: ${deleteError.message}`);
    }

    console.log('✅ Successfully cleaned up test data');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testDatabaseConnection(); 