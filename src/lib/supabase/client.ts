import { createClient } from '@supabase/supabase-js';
import type { Subscriber, EmailEvent } from '@/types/database';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function createSubscriber(
  email: string,
  firstName?: string,
  referralCode?: string
): Promise<{ data: Subscriber | null; error: Error | null }> {
  try {
    // Check if subscriber exists
    const { data: existingSubscriber } = await supabase
      .from('subscribers')
      .select('id, email')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      return {
        data: null,
        error: new Error('Email already subscribed'),
      };
    }

    // Get referrer if referral code exists
    let referredBy: string | undefined;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('subscribers')
        .select('id')
        .eq('referral_code', referralCode)
        .single();
      
      if (referrer) {
        referredBy = referrer.id;
      }
    }

    // Create new subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert({
        email,
        first_name: firstName,
        referred_by: referredBy,
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
    };
  }
}

export async function logEmailEvent(
  subscriberId: string,
  eventType: EmailEvent['event_type'],
  status: EmailEvent['status'],
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const { error } = await supabase.from('email_events').insert({
      subscriber_id: subscriberId,
      event_type: eventType,
      status,
      metadata,
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error logging email event:', error);
    // Don't throw error to prevent disrupting the main flow
  }
}

export async function updateSubscriberStatus(
  subscriberId: string,
  isActive: boolean,
  unsubscribedAt?: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from('subscribers')
      .update({
        is_active: isActive,
        unsubscribed_at: unsubscribedAt,
      })
      .eq('id', subscriberId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating subscriber status:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
    };
  }
} 