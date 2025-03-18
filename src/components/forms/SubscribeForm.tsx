'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
  firstName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SubscribeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }

      toast.success('Successfully subscribed! Check your email for confirmation.');
      form.reset();
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent-hover text-background font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
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