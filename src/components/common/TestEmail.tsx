'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function TestEmail() {
  const [isLoading, setIsLoading] = useState(false);

  const sendTestEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Test email sent successfully!');
        console.log('Success response:', data);
      } else {
        const errorMessage = data.error || data.message || 'Unknown error';
        toast.error(`Failed to send test email: ${errorMessage}`);
        console.error('Error details:', data);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to send test email: ${errorMessage}`);
      console.error('Test email error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={sendTestEmail}
        disabled={isLoading}
        className="corner-hover px-4 py-2 text-sm bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
      >
        {isLoading ? 'Sending...' : 'Test Email'}
      </button>
    </div>
  );
} 