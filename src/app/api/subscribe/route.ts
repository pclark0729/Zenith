import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { sendWelcomeEmail } from '@/lib/email/sendgrid';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName } = subscribeSchema.parse(body);

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email,
          first_name: firstName,
          subscribed_at: new Date().toISOString(),
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Send welcome email
    try {
      await sendWelcomeEmail({ email, first_name: firstName });
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Continue without failing the request
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 