import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const apiKey = process.env.SENDGRID_API_KEY;
console.log('SendGrid API Key exists:', !!apiKey);
console.log('SendGrid API Key length:', apiKey?.length);

if (!apiKey) {
  throw new Error('SendGrid API key is not configured');
}

sgMail.setApiKey(apiKey);

export async function POST() {
  try {
    const msg = {
      to: process.env.EMAIL_FROM!, // Send to the same email as sender for testing
      from: process.env.EMAIL_FROM!,
      subject: 'Zenith Newsletter - Test Email',
      text: 'This is a test email from the Zenith Newsletter application.',
      html: `
        <div>
          <h1>Test Email</h1>
          <p>This is a test email from the Zenith Newsletter application.</p>
          <p>If you're seeing this, the SendGrid integration is working correctly!</p>
        </div>
      `,
    };

    console.log('Attempting to send email to:', msg.to);
    console.log('From:', msg.from);

    const response = await sgMail.send(msg);
    console.log('SendGrid Response:', response);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      response: response
    });
  } catch (error) {
    console.error('SendGrid Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send test email',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error
      },
      { status: 500 }
    );
  }
} 