'use client';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import {
  DatePicker as AriaDatePicker,
  Button,
  type DateValue,
  Group,
  type PopoverProps,
} from 'react-aria-components';
import { Calendar } from '@/components/ui/calendar-rac';
import { DateInput } from '@/components/ui/datefield-rac';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function DatePicker({
  value,
  onChange,
  isDateUnavailable,
  error,
}: {
  value?: DateValue;
  placement?: PopoverProps['placement'];
  onChange?: (date: DateValue | null) => void;
  isDateUnavailable?: (date: DateValue) => boolean;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AriaDatePicker
      className="*:not-first:mt-2"
      isDateUnavailable={isDateUnavailable}
      onChange={onChange}
      value={value}
    >
      <div className="flex">
        <Group className="w-full">
          <DateInput
            className={cn(
              'pe-9',
              error
                ? '!border-destructive !ring-destructive/20 dark:!ring-destructive/40'
                : ''
            )}
          />
        </Group>
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverTrigger asChild>
            <Button className="-ms-9 -me-px z-1 flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50">
              <CalendarIcon size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-2">
            <Calendar
              onChange={() => {
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </AriaDatePicker>
  );
}
