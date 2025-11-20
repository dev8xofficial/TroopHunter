'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FileUpload } from '../../Input/FileUpload/FileUpload';
import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Input } from '../../Input/TextField/Input';
import { Fieldset } from '../../Input/Fieldset/Fieldset';
import { Textarea } from '../../Input/Textarea/Textarea';
import { Button } from '../../Input/Button/Button';
// import { ToggleField } from '../../Input/CheckboxField/CheckboxField';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';

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

export const FormModal: React.FC = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

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
    <div className={ContactFormModalStyles['modal-container']}>
      {showSuccess ? (
        <div className={ContactFormModalStyles['success']}>
          <div className={ContactFormModalStyles['modal-header']}></div>
          <h1 className={ContactFormModalStyles['modal-heading']}>Message received!</h1>
          <p className={ContactFormModalStyles['success__message']}>Thanks for contacting us, we'll be in touch very soon.</p>
        </div>
      ) : showError ? (
        <div className={ContactFormModalStyles['error']}>
          <div className={ContactFormModalStyles['modal-header']}></div>
          <h1 className={ContactFormModalStyles['modal-error']}>Message failed.</h1>
          <p className={ContactFormModalStyles['error__message']}>Please try again later or contact us directly.</p>
        </div>
      ) : (
        <>
          <div className={ContactFormModalStyles['modal-header']}></div>
          <h1 className={ContactFormModalStyles['modal-heading']}>Let's get started.</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}>
            <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
              <p>Fill in the blanks and we'll respond in one business day.</p>
              <p>Just want to chat? Call or email, we're a nice bunch.</p>
            </div>

            <FieldWrapper className="col-sm-2" label="What's your name?" error={errors.name?.message}>
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
            </Fieldset>

            {/* <FieldWrapper label="Tell us about the project">
              <ToggleField label="DevOps Setup (One Time)" secondaryLabel="+ $300.00" checked={isChecked} setChecked={setIsChecked} />
            </FieldWrapper> */}

            <FieldWrapper label="Write us a message">
              <Textarea id="project" {...register('project')} />
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
