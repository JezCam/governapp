'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  date,
  onSelect,
}: {
  date: Date;
  onSelect: (d: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className="justify-between font-normal"
          id="date"
          variant="outline"
        >
          {date ? (
            date.toLocaleDateString()
          ) : (
            <span className="text-muted-foreground">Select date</span>
          )}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto overflow-hidden p-0">
        <Calendar
          captionLayout="dropdown"
          mode="single"
          onSelect={(d) => {
            onSelect(d);
            setOpen(false);
          }}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
}
