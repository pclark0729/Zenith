-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create subscribers table
CREATE TABLE subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    confirmation_token UUID DEFAULT gen_random_uuid(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    referral_code VARCHAR(50) UNIQUE,
    referred_by UUID REFERENCES subscribers(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for faster lookups
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_referral_code ON subscribers(referral_code);

-- Create email events table
CREATE TABLE email_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subscriber_id UUID REFERENCES subscribers(id),
    event_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for subscriber event history
CREATE INDEX idx_email_events_subscriber ON email_events(subscriber_id);

-- Create function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Generate a random 8-character referral code
  NEW.referral_code := UPPER(SUBSTRING(MD5(NEW.id::text) FROM 1 FOR 8));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate referral code on insert
CREATE TRIGGER generate_referral_code_trigger
BEFORE INSERT ON subscribers
FOR EACH ROW
EXECUTE FUNCTION generate_referral_code();

-- Create Row Level Security (RLS) policies
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting new subscribers
CREATE POLICY "Allow anonymous subscription"
ON subscribers FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow reading own subscriber data
CREATE POLICY "Allow reading own subscriber data"
ON subscribers FOR SELECT
TO anon
USING (true);

-- Create policy to allow inserting email events
CREATE POLICY "Allow inserting email events"
ON email_events FOR INSERT
TO service_role
WITH CHECK (true);

-- Create policy to allow reading email events
CREATE POLICY "Allow reading email events"
ON email_events FOR SELECT
TO service_role
USING (true); 