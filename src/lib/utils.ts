import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(time: number) {
  const date = new Date(time);
  return format(date, 'd MMM yyyy');
}

export function categoriseDueDate(dueDate: Date): {
  category: 'overdue' | 'soon' | 'upcoming';
  daysRemaining: number;
} {
  const today = new Date();
  const daysRemaining = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysRemaining < 0) {
    return { category: 'overdue', daysRemaining };
  }
  if (daysRemaining <= 7) {
    return { category: 'soon', daysRemaining };
  }
  return { category: 'upcoming', daysRemaining };
}
