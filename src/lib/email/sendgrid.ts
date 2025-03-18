import sgMail from '@sendgrid/mail';
import type { Subscriber } from '@/types/database';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('Missing SENDGRID_API_KEY environment variable');
}

if (!process.env.EMAIL_FROM) {
  throw new Error('Missing EMAIL_FROM environment variable');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface WelcomeEmailData {
  email: string;
  first_name?: string;
}

export async function sendWelcomeEmail({ email, first_name }: WelcomeEmailData) {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM!,
    subject: 'Welcome to Zenith! 🌟',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #DEB887; margin-bottom: 20px;">Welcome to Zenith, ${first_name || 'there'}! 🌟</h1>
        
        <p style="color: #333; line-height: 1.6;">
          Thank you for joining our community of mindful individuals committed to personal growth and productivity.
        </p>
        
        <p style="color: #333; line-height: 1.6;">
          Starting next week, you'll receive our weekly newsletter packed with:
        </p>
        
        <ul style="color: #333; line-height: 1.6;">
          <li>Mindfulness practices and meditation tips</li>
          <li>Growth mindset strategies</li>
          <li>Productivity hacks and time management techniques</li>
          <li>Personal development insights</li>
        </ul>
        
        <p style="color: #333; line-height: 1.6;">
          In the meantime, feel free to follow us on social media for daily inspiration:
        </p>
        
        <div style="margin: 30px 0;">
          <a href="https://twitter.com/zenithnews" style="color: #DEB887; text-decoration: none; margin-right: 15px;">Twitter</a>
          <a href="https://linkedin.com/company/zenithnews" style="color: #DEB887; text-decoration: none;">LinkedIn</a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          If you didn't subscribe to our newsletter, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
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