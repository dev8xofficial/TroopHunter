'use client';

import React from 'react';
import { Field, Label, Select } from '@headlessui/react';

import InputStyles from '../TextField/index.module.css';
import TextAreastyles from '../Textarea/index.module.css';

export interface TimeSlotType {
  id: number;
  label: string; // e.g. "10:00 AM - 11:00 AM"
  value: string; // e.g. "10-11"
}

interface TimeSlotProps {
  slots: TimeSlotType[];
  selectedSlot?: TimeSlotType;
  setSelectedSlot?: (value: TimeSlotType) => void;
}

export const TimeSlotField: React.FC<TimeSlotProps> = ({
  slots,
  selectedSlot,
  setSelectedSlot,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const found = slots.find((slot) => slot.value === selectedValue);

    if (!found) return;

    if (typeof setSelectedSlot !== 'function') {
      console.error('setSelectedSlot is not a function:', setSelectedSlot);
      return;
    }

    setSelectedSlot(found);
    console.log(`Selected time slot:`, found);
  };

  return (
    <div>
      <Field>
        <Label className="sr-only">Pick a Time Slot</Label>
        <div className="relative">
          <Select
            value={selectedSlot?.value || ''}
            onChange={handleChange}
            className={`${TextAreastyles['textarea']} ${InputStyles['input']}`}
            style={{ background: 'transparent' }}
          >
            <option value="" disabled hidden>
              Select a time slot
            </option>
            {slots.map((slot) => (
              <option key={slot.id} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </Select>
        </div>
      </Field>
    </div>
  );
};
