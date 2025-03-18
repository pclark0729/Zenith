import sgMail from '@sendgrid/mail';
import type { Subscriber } from '@/types/database';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('Missing environment variable: SENDGRID_API_KEY');
}

if (!process.env.EMAIL_FROM) {
  throw new Error('Missing environment variable: EMAIL_FROM');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendWelcomeEmail(subscriber: Pick<Subscriber, 'email' | 'first_name'>): Promise<boolean> {
  try {
    const msg = {
      to: subscriber.email,
      from: process.env.EMAIL_FROM!,
      subject: 'Welcome to Zenith Newsletter! 🌟',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9;">Welcome to Zenith${subscriber.first_name ? `, ${subscriber.first_name}` : ''}!</h1>
          
          <p>Thank you for subscribing to our weekly newsletter on mindfulness, growth mindset, and productivity habits.</p>
          
          <p>What to expect:</p>
          <ul>
            <li>Weekly insights on personal growth</li>
            <li>Practical mindfulness techniques</li>
            <li>Productivity tips and strategies</li>
            <li>Exclusive resources and tools</li>
          </ul>
          
          <p>Your first newsletter will arrive next week. In the meantime, you can follow us on social media for daily inspiration:</p>
          
          <div style="margin: 20px 0;">
            <a href="https://twitter.com/zenith" style="color: #0ea5e9; text-decoration: none; margin-right: 15px;">Twitter</a>
            <a href="https://instagram.com/zenith" style="color: #0ea5e9; text-decoration: none;">Instagram</a>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you didn't sign up for this newsletter, you can safely ignore this email.
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

export async function sendConfirmationEmail(
  subscriber: Pick<Subscriber, 'email' | 'confirmation_token'>
): Promise<boolean> {
  try {
    const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/confirm?token=${subscriber.confirmation_token}`;
    
    const msg = {
      to: subscriber.email,
      from: process.env.EMAIL_FROM!,
      subject: 'Confirm your Zenith Newsletter subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0ea5e9;">Confirm your subscription</h1>
          
          <p>Please click the button below to confirm your email address:</p>
          
          <a href="${confirmationUrl}" 
             style="display: inline-block; background-color: #0ea5e9; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 4px; 
                    margin: 20px 0;">
            Confirm Email
          </a>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you didn't sign up for this newsletter, you can safely ignore this email.
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
} 