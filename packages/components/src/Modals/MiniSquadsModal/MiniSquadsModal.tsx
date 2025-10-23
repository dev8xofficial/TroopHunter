import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Input } from '../../Input/TextField/Input';
import { Fieldset } from '../../Input/Fieldset/Fieldset';
import { Textarea } from '../../Input/Textarea/Textarea';
import { Button } from '../../Input/Button/Button';
import { ToggleField } from '../../Input/ToggleField/ToggleField';
import { HighlightBox } from '../../Input/HighlightBox/HighlightBox';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import CaseStudySiderbarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';

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

export const MiniSquadsModal: React.FC = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isChecked, setChecked] = useState({
    mvp: false,
    prototype: false,
    management: false,
    saas: false,
    design: false,
    backend: false,
    devops: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    },
  });

  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value ?? '');
    });

    // ✅ Add toggle states
    formData.append('selectedStages', JSON.stringify(isChecked));

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowSuccess(true);
        reset();
        setChecked({
          mvp: false,
          prototype: false,
          management: false,
          saas: false,
          design: false,
          backend: false,
          devops: false,
        });
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
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
            Thanks for considering Dev8X for your project — we’ll be in touch soon.
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
          <div className={ContactFormModalStyles['modal-header']}></div>
          <h1 className={ContactFormModalStyles['modal-heading']}>Let's Hire Mini Squad</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}
          >
            <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
              <p>Fill in the blanks and we’ll respond in one business day.</p>
              <p>Just want to chat? Call or email — we’re a nice bunch.</p>
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

            <FieldWrapper className="col-sm-1" label="Company name?" error={errors.company?.message}>
              <Input
                type="text"
                id="company"
                placeholder="Widgets, Inc."
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
            </Fieldset>

            {/* --- Project Details --- */}
            <FieldWrapper label="Tell us about the project" className="col-sm-2">
              <Textarea id="project" {...register('project')} style={{ height: '200px' }} />
            </FieldWrapper>

            {/* Stages */}
            <Fieldset>
              <FieldWrapper label="Current Stages">
                {[
                  { key: 'mvp', label: 'Just an idea / Pre-MVP (Month)', price: '+ $5000.00' },
                  { key: 'prototype', label: 'Prototype Ready (Month)', price: '+ $6000.00' },
                  { key: 'management', label: 'Live Products & Improvements (Month)', price: '+ $7000.00' },
                  { key: 'saas', label: 'Scaling Existing SaaS', price: 'Not sure yet' },
                ].map((item) => (
                  <ToggleField
                    key={item.key}
                    label={item.label}
                    secondaryLabel={item.price}
                    checked={isChecked[item.key as keyof typeof isChecked]}
                    setChecked={() =>
                      setChecked((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof isChecked],
                      }))
                    }
                  />
                ))}
              </FieldWrapper>
            </Fieldset>

            {/* Add-ons */}
            <Fieldset>
              <FieldWrapper label="Add-Ons">
                {[
                  { key: 'design', label: 'Product Design Support (Month)', price: '+ $500.00' },
                  { key: 'backend', label: 'Extra Backend Developer (Month)', price: '+ $1200.00' },
                  { key: 'devops', label: 'DevOps Setup (One Time)', price: '+ $300.00' },
                ].map((item) => (
                  <ToggleField
                    key={item.key}
                    label={item.label}
                    secondaryLabel={item.price}
                    checked={isChecked[item.key as keyof typeof isChecked]}
                    setChecked={() =>
                      setChecked((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof isChecked],
                      }))
                    }
                  />
                ))}
              </FieldWrapper>
            </Fieldset>

            {/* Plan Section */}
            <FieldWrapper className="col-sm-2" label="Plans">
              <HighlightBox variant="contained">
                <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${ContactFormModalStyles['mb-0']}`}>
                  <li>Dedicated Slack Channel for Communication</li>
                  <li>Weekly Progress & Team Sync Meetings</li>
                  <li>Complete Project Transparency via ClickUp or Jira</li>
                  <li>Flexible Month-to-Month Commitment</li>
                </ul>
              </HighlightBox>
            </FieldWrapper>



            {/* --- Submit --- */}
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
