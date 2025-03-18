const { supabase, createSubscriber } = require('../src/lib/supabase/client');

async function testDatabaseConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from('subscribers').select('count(*)', { count: 'exact' });
    
    if (error) throw error;
    
    console.log('✅ Successfully connected to Supabase');
    console.log(`Current subscriber count: ${data[0].count}`);

    // Test subscriber creation
    const testEmail = `test_${Date.now()}@example.com`;
    const { data: subscriber, error: createError } = await createSubscriber(
      testEmail,
      'Test User'
    );

    if (createError) throw createError;

    console.log('✅ Successfully created test subscriber');
    console.log('Subscriber details:', subscriber);

    // Clean up test data
    await supabase
      .from('subscribers')
      .delete()
      .eq('email', testEmail);

    console.log('✅ Successfully cleaned up test data');
  } catch (error) {
    console.error('❌ Error testing database connection:', error);
    process.exit(1);
  }
}

testDatabaseConnection(); 