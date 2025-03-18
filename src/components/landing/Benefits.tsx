'use client';

import { Brain, Lightbulb, Target, Clock, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const benefits = [
  {
    title: 'Mindful Living',
    description: 'Learn practical techniques to stay present and reduce stress in your daily life.',
    icon: Brain,
  },
  {
    title: 'Growth Mindset',
    description: 'Develop a mindset that turns challenges into opportunities for personal growth.',
    icon: Lightbulb,
  },
  {
    title: 'Goal Achievement',
    description: 'Master proven strategies to set and achieve meaningful personal and professional goals.',
    icon: Target,
  },
  {
    title: 'Time Management',
    description: 'Optimize your daily routines and boost productivity with effective time management techniques.',
    icon: Clock,
  },
  {
    title: 'Self-Care Practices',
    description: 'Discover sustainable self-care habits that enhance your well-being and energy levels.',
    icon: Heart,
  },
  {
    title: 'Community Support',
    description: 'Join a community of like-minded individuals committed to personal growth and development.',
    icon: Users,
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Transform Your Life with Zenith
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our weekly newsletter delivers practical insights and actionable strategies to help you live
            a more mindful, productive, and fulfilling life.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-border/50 bg-background/50">
              <CardHeader>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 