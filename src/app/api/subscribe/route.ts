import { NextResponse } from 'next/server';
import { createSubscriber } from '@/lib/supabase/client';
import { sendWelcomeEmail, sendConfirmationEmail } from '@/lib/email/sendgrid';
import type { SubscribeRequest, SubscribeResponse } from '@/types/database';

export async function POST(request: Request): Promise<NextResponse<SubscribeResponse>> {
  try {
    const body = (await request.json()) as SubscribeRequest;
    const { email, firstName, referralCode } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is required',
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Email is required',
          },
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid email format',
          },
        },
        { status: 400 }
      );
    }

    // Create subscriber in database
    const { data: subscriber, error } = await createSubscriber(email, firstName, referralCode);

    if (error) {
      if (error.message === 'Email already subscribed') {
        return NextResponse.json(
          {
            success: false,
            message: 'This email is already subscribed to our newsletter',
            error: {
              code: 'ALREADY_SUBSCRIBED',
              message: 'Email already subscribed',
            },
          },
          { status: 409 }
        );
      }

      throw error;
    }

    if (!subscriber) {
      throw new Error('Failed to create subscriber');
    }

    // Send welcome and confirmation emails if SendGrid is configured
    if (process.env.SENDGRID_API_KEY && process.env.EMAIL_FROM) {
      try {
        await Promise.all([
          sendWelcomeEmail({ email, first_name: firstName }),
          sendConfirmationEmail({ email, confirmation_token: subscriber.confirmation_token }),
        ]);
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Continue without failing the request
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
        data: {
          subscriber: {
            id: subscriber.id,
            email: subscriber.email,
            referral_code: subscriber.referral_code,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in subscribe API:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your subscription',
        error: {
          code: 'SERVER_ERROR',
          message: 'Internal server error',
        },
      },
      { status: 500 }
    );
  }
} 