'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SubscribeForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      toast.success('Welcome to Zenith! 🌟', {
        description: 'Check your inbox for our welcome email.',
      });
      form.reset();
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="subscribe" className="relative py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Join Our Newsletter
            </h2>
            <p className="text-lg text-foreground/80">
              Get weekly insights on mindfulness, productivity, and personal growth.
            </p>
          </div>

          <div className="p-8 rounded-lg border-gradient bg-card/50 backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">First Name (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
                          {...field}
                          className="bg-background/50 border-accent/20 focus:border-accent/40 text-foreground placeholder:text-foreground/50" 
                        />
                      </FormControl>
                      <FormDescription className="text-foreground/60">
                        Help us personalize your experience
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john@example.com" 
                          type="email" 
                          {...field}
                          className="bg-background/50 border-accent/20 focus:border-accent/40 text-foreground placeholder:text-foreground/50" 
                        />
                      </FormControl>
                      <FormDescription className="text-foreground/60">
                        We&apos;ll never share your email with anyone else
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <label htmlFor="terms" className="text-sm text-foreground/60">
                  I agree to receive weekly emails and accept the{' '}
                  <a href="/privacy" className="text-accent hover:text-accent/80 transition-colors">
                    privacy policy
                  </a>
                  {' '}and{' '}
                  <a href="/terms" className="text-accent hover:text-accent/80 transition-colors">
                    terms of service
                  </a>
                </label>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="corner-hover w-full px-8 py-4 text-accent hover:text-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                      SUBSCRIBING...
                    </>
                  ) : (
                    'SUBSCRIBE NOW'
                  )}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/0 via-background to-background -z-10"></div>
    </section>
  );
} 