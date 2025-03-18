# Zenith Newsletter

A modern, minimalist newsletter subscription website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- ✨ Interactive animations and transitions
- 📱 Mobile-first approach
- 🔒 Secure email collection
- 📧 Automated welcome emails
- 📊 Analytics integration

## Tech Stack

- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Email Service:** SendGrid
- **Deployment:** Vercel
- **Analytics:** Google Analytics (Optional)

## Prerequisites

- Node.js 18+ and npm
- Supabase account
- SendGrid account
- Vercel account (for deployment)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zenith.git
   cd zenith
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### 1. Database Setup

1. Create a new Supabase project
2. Run the following SQL to create the required tables:
   ```sql
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

   CREATE INDEX idx_subscribers_email ON subscribers(email);
   CREATE INDEX idx_subscribers_referral_code ON subscribers(referral_code);
   ```

### 2. Email Service Setup

1. Create a SendGrid account
2. Generate an API key
3. Set up email templates for welcome emails
4. Add the API key to your environment variables

### 3. Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the following environment variables in Vercel:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SENDGRID_API_KEY`
   - `EMAIL_FROM`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Optional)

4. Deploy!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Your application URL | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `SENDGRID_API_KEY` | SendGrid API key | Yes |
| `EMAIL_FROM` | Sender email address | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | No |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
