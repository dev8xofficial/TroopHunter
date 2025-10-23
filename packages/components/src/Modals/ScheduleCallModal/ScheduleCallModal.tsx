import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Input } from '../../Input/TextField/Input';
import { Fieldset } from '../../Input/Fieldset/Fieldset';
import { Textarea } from '../../Input/Textarea/Textarea';
import { Button } from '../../Input/Button/Button';
import { TimeSlotField, TimeSlotType } from '../../Input/TimeSlotField/TimeSlotField';
import { FileUpload } from '../../Input/FileUpload/FileUpload';

import CaseStudySidebarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';
import ContactFormModalStyles from '../ContactFormModal/index.module.css';

interface IFormInputs {
  name: string;
  company: string;
  phone: string;
  email: string;
  budget: string;
  timeline?: string;
  project?: string;
  upload?: File[];
  referral?: string;
  date?: string;
  timeSlot?: string;
}

export const ScheduleCallModal: React.FC = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      budget: '',
      timeline: '',
      project: '',
      referral: '',
      date: '',
      timeSlot: ''
    }
  });

  const availableSlots: TimeSlotType[] = [
    { id: 1, label: '09:00 AM - 09:30 AM', value: '9-9:30' },
    { id: 2, label: '09:30 AM - 10:00 AM', value: '9:30-10' },
    { id: 3, label: '10:00 AM - 10:30 AM', value: '10-10:30' },
    { id: 4, label: '10:30 AM - 11:00 AM', value: '10:30-11' },
    { id: 5, label: '11:00 AM - 11:30 AM', value: '11-11:30' },
    { id: 6, label: '11:30 AM - 12:00 PM', value: '11:30-12' },
    { id: 7, label: '12:00 PM - 12:30 PM', value: '12-12:30' },
    { id: 8, label: '12:30 PM - 01:00 PM', value: '12:30-1' },
    { id: 9, label: '01:00 PM - 01:30 PM', value: '1-1:30' },
    { id: 10, label: '01:30 PM - 02:00 PM', value: '1:30-2' },
    { id: 11, label: '02:00 PM - 02:30 PM', value: '2-2:30' },
    { id: 12, label: '02:30 PM - 03:00 PM', value: '2:30-3' },
    { id: 13, label: '03:00 PM - 03:30 PM', value: '3-3:30' },
    { id: 14, label: '03:30 PM - 04:00 PM', value: '3:30-4' }
  ];

  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'upload') {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((file: File) => formData.append('upload', file));
        }
      } else {
        formData.append(key, value ?? '');
      }
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        reset();
      } else {
        setShowError(true);
        setShowSuccess(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setShowError(true);
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={ContactFormModalStyles['modal-container']}>
      {showSuccess ? (
        <div className={ContactFormModalStyles['success']}>
          <div className={ContactFormModalStyles['modal-header']}></div>
          <h1 className={ContactFormModalStyles['modal-heading']}>Message received!</h1>
          <p className={ContactFormModalStyles['success__message']}>
            Thanks for considering Dev8X for your project, we'll be in touch very soon.
          </p>
        </div>
      ) : showError ? (
        <div className={ContactFormModalStyles['error']}>
          <div className={ContactFormModalStyles['modal-header']}></div>
          <h1 className={ContactFormModalStyles['modal-error']}>Message failed.</h1>
          <p className={ContactFormModalStyles['error__message']}>
            Please try again later or contact us directly.
          </p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '50px' }}></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}
          >
            <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
              <h1 className={`col-full ${CaseStudySidebarStyles['sidebar__title']}`}>Book Your Free 30-Minute Consultation</h1>
              <p className={`col-full ${CaseStudySidebarStyles['sidebar__intro']}`}>
                Talk directly with our technical lead to discuss your project, team fit, and next
                steps.
              </p>
            </div>

            <FieldWrapper className="col-sm-2" label="What's your name?" error={errors.name?.message}>
              <Input
                type="text"
                id="name"
                placeholder="Your name here"
                {...register('name', { required: 'Please enter your name' })}
              />
            </FieldWrapper>

            <FieldWrapper
              className="col-sm-2"
              label="Name of your company?"
              error={errors.company?.message}
            >
              <Input
                type="text"
                id="company"
                placeholder="Widgets, Inc"
                {...register('company', { required: 'Please enter your company name' })}
              />
            </FieldWrapper>

            <Fieldset label="How shall we contact you?">
              <FieldWrapper className="col-sm-2" error={errors.email?.message}>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  {...register('email', {
                    required: 'Please enter your email address',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </FieldWrapper>
            </Fieldset>

            <FieldWrapper label="Pick Your Date" className="col-sm-2" error={errors.date?.message}>
              <Input
                type="date"
                id="date"
                {...register('date', { required: 'Please select a date' })}
              />
            </FieldWrapper>

            <Controller
              name="timeSlot"
              control={control}
              rules={{ required: 'Please choose a time slot' }}
              render={({ field }) => (
                <FieldWrapper
                  label="Choose Your Time Slot"
                  className="col-sm-2"
                  error={errors.timeSlot?.message}
                >
                  <TimeSlotField
                    slots={availableSlots}
                    selectedSlot={
                      availableSlots.find((slot) => slot.value === field.value) || undefined
                    }
                    setSelectedSlot={(slot) => field.onChange(slot.value)}
                  />
                </FieldWrapper>
              )}
            />

            <FieldWrapper label="Tell us about the project">
              <Textarea id="project" {...register('project')} />
            </FieldWrapper>

            <Button
              type="submit"
              variant="primary"
              context="contact"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
