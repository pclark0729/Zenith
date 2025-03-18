import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    default: 'Zenith | Weekly Mindfulness & Growth Newsletter',
    template: '%s | Zenith'
  },
  description: 'Join Zenith for weekly insights on mindfulness, growth mindset, and productivity habits. Transform your life with expert guidance and practical tips.',
  keywords: ['mindfulness', 'growth mindset', 'productivity', 'personal development', 'newsletter', 'wellness', 'mental health', 'self-improvement'],
  authors: [{ name: 'Zenith Team' }],
  creator: 'Zenith',
  publisher: 'Zenith',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zenith.news'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zenith.news',
    siteName: 'Zenith',
    title: 'Zenith | Weekly Mindfulness & Growth Newsletter',
    description: 'Join Zenith for weekly insights on mindfulness, growth mindset, and productivity habits. Transform your life with expert guidance and practical tips.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zenith Newsletter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenith | Weekly Mindfulness & Growth Newsletter',
    description: 'Join Zenith for weekly insights on mindfulness, growth mindset, and productivity habits. Transform your life with expert guidance and practical tips.',
    images: ['/og-image.jpg'],
    creator: '@zenithnews',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}; 