import React from 'react';

export interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error' | 'email' | 'system' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'today' | 'upcoming';
}
