import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FileUpload } from '../FileUpload/FileUpload';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
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
  upload?: File[]; // Changed from string to File[] for proper typing
  referral?: string;
}

export const ContactFormModal: React.FC = (): JSX.Element => {
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
      referral: ''
    }
  });

  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'upload') {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((file: File) => {
            formData.append('upload', file);
          });
        }
        // If upload is empty or undefined, do nothing here
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
      setShowError(true);
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles['modal-container']}>
      {showSuccess ? (
        <div className={styles['success']}>
          <div className={styles['modal-header']}></div>
          <h1 className={styles['modal-heading']}>Message received!</h1>
          <p className={styles['success__message']}>Thanks for considering Dev8x for your project, we'll be in touch very soon.</p>
        </div>
      ) : showError ? (
        <div className={styles['error']}>
          <div className={styles['modal-header']}></div>
          <h1 className={styles['modal-error']}>Message failed.</h1>
          <p className={styles['error__message']}>Please try again later or contact us directly.</p>
        </div>
      ) : (
        <>
          <div className={styles['modal-header']}></div>
          <h1 className={styles['modal-heading']}>Let's get started.</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={`${styles['contact-form']} grid-cols-2`}>
            <div className={`col-full ${styles['modal-intro']}`}>
              <p>Fill in the blanks and we'll respond in one business day.</p>
              <p>Just want to chat? Call or email, we're a nice bunch.</p>
            </div>

            <FieldWrapper className="col-sm-1" label="What's your name?" error={errors.name?.message}>
              <Input
                type="text"
                id="name"
                placeholder="Your name here"
                {...register('name', {
                  required: 'Please enter your name',
                  maxLength: { value: 20, message: 'Name cannot exceed 20 characters' }
                })}
              />
            </FieldWrapper>

            <FieldWrapper className="col-sm-1" label="Name of your company?" error={errors.company?.message}>
              <Input
                type="text"
                id="company"
                placeholder="Widgets, Inc"
                {...register('company', {
                  required: 'Please enter your company name',
                  maxLength: { value: 20, message: 'Company name cannot exceed 20 characters' }
                })}
              />
            </FieldWrapper>

            <Fieldset label="How shall we contact you?">
              <FieldWrapper className="col-sm-1" error={errors.phone?.message}>
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
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" error={errors.email?.message}>
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

              <FieldWrapper className="col-sm-1" label="Budget expectation" message="A transparent budget will help us ensure expectations are met." error={errors.budget?.message}>
                <Input
                  type="text"
                  id="budget"
                  {...register('budget', {
                    required: 'Please enter your budget',
                    maxLength: { value: 10, message: 'Budget text is too long' }
                  })}
                />
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" label="Timeline" message="If you have an ideal timeline or deadline, please let us know." messageId="timeline">
                <Input type="text" id="timeline" {...register('timeline')} />
              </FieldWrapper>
            </Fieldset>

            <FieldWrapper label="Tell us about the project">
              <Textarea id="project" {...register('project')} />
            </FieldWrapper>

            <Controller
              name="upload"
              control={control}
              render={({ field: { onChange, name } }) => (
                <FieldWrapper id="upload" label="Please attach any relevant documents" message="Maximum 10 files of 25MB each. Maximum 100MB total." messageId="upload-help" error="">
                  <FileUpload onChange={onChange} name={name} />
                </FieldWrapper>
              )}
            />

            <FieldWrapper label="How did you hear about us?">
              <Input type="text" id="referral" placeholder="From a friend? From Google?" {...register('referral')} />
            </FieldWrapper>

            <Button type="submit" variant="primary" context="contact" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
