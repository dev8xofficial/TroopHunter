import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FieldWrappper } from '../FieldWrapper/FieldWrapper';
import { Input } from '../Input/Input';
import { Fieldset } from '../Fieldset/Fieldset';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';

import styles from './index.module.css';

interface IFormInputs {
  name: string;
  company: string;
  phone: string;
  email: string;
  budget: string;
  timeline?: string;
  project?: string;
  referral?: string;
}

export const ContactFormModal: React.FC = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
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
      referral: ''
    }
  });
  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Email sent successfully!');
        setShowSuccess(true);
        reset();
      } else {
        alert('Email sending failed. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles['modal-container']}>
      {showSuccess ? (
        <div className={styles['success']}>
          <h1 className={styles['modal-heading']}>Message received!</h1>
          <p className={styles['success__message']}>Thanks for considering Dev8x for your project, we'll be in touch very soon.</p>
        </div>
      ) : (
        <>
          <h1 className={styles['modal-heading']}>Let's get started.</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={`${styles['contact-form']} grid-cols-2`}>
            <div className={`col-full ${styles['modal-intro']}`}>
              <p>Fill in the blanks and we'll respond in one business day.</p>
              <p>Just want to chat? Call or email, we're a nice bunch.</p>
            </div>

            <FieldWrappper className="col-sm-1" label="What's your name?" error={errors.name?.message}>
              <Input
                type="text"
                id="name"
                placeholder="Your name here"
                {...register('name', {
                  required: 'Please enter your name',
                  maxLength: { value: 5, message: 'Name cannot exceed 5 characters' }
                })}
              />
            </FieldWrappper>

            <FieldWrappper className="col-sm-1" label="Name of your company?" error={errors.company?.message}>
              <Input
                type="text"
                id="company"
                placeholder="Company name"
                {...register('company', {
                  required: 'Please enter your company name',
                  maxLength: { value: 5, message: 'Company name cannot exceed 5 characters' }
                })}
              />
            </FieldWrappper>

            <Fieldset label="How shall we contact you?">
              <FieldWrappper className="col-sm-1" error={errors.phone?.message}>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  {...register('phone', {
                    required: 'Please enter your phone number',
                    pattern: {
                      value: /^[0-9+\-()\s]*$/,
                      message: 'Invalid phone number format'
                    }
                  })}
                />
              </FieldWrappper>

              <FieldWrappper className="col-sm-1" error={errors.email?.message}>
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
              </FieldWrappper>

              <FieldWrappper className="col-sm-1" label="Budget expectation" message="A transparent budget will help us ensure expectations are met." error={errors.budget?.message}>
                <Input
                  type="text"
                  id="budget"
                  {...register('budget', {
                    required: 'Please enter your budget',
                    maxLength: { value: 10, message: 'Budget text is too long' }
                  })}
                />
              </FieldWrappper>

              <FieldWrappper className="col-sm-1" label="Timeline" message="If you have an ideal timeline or deadline, please let us know." messageId="timeline">
                <Input type="text" id="timeline" placeholder="Optional" {...register('timeline')} />
              </FieldWrappper>
            </Fieldset>

            <FieldWrappper label="Tell us about the project">
              <Textarea id="project" {...register('project')} />
            </FieldWrappper>

            <FieldWrappper label="How did you hear about us?">
              <Input type="text" id="referral" placeholder="From a friend? From Google?" {...register('referral')} />
            </FieldWrappper>

            <Button type="submit" variant="primary" context="contact" fullWidth>
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
