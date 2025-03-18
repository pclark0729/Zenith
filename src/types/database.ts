// Database Models
export interface Subscriber {
  id: string;
  email: string;
  first_name?: string;
  subscribed_at: string;
  is_active: boolean;
  confirmation_token: string;
  confirmed_at?: string;
  unsubscribed_at?: string;
  referral_code: string;
  referred_by?: string;
  metadata?: Record<string, unknown>;
}

export interface EmailEvent {
  id: string;
  subscriber_id: string;
  event_type: 'welcome' | 'newsletter' | 'confirmation';
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// API Request/Response Types
export interface SubscribeRequest {
  email: string;
  firstName?: string;
  referralCode?: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  error?: {
    code: string;
    message: string;
  };
  data?: {
    subscriber: {
      id: string;
      email: string;
      referral_code: string;
    };
  };
} 