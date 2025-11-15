'use client';

import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Input } from '../../Input/TextField/Input';
import { Fieldset } from '../../Input/Fieldset/Fieldset';
import { Textarea } from '../../Input/Textarea/Textarea';
import { Button } from '../../Input/Button/Button';
import { Pill } from '../../Surfaces/Pill/Pill';
import { HighlightBox } from '../../Input/HighlightBox/HighlightBox';
import { ExpertiseOffersSliderItem } from '../../Interfaces/Expertise/Expertise';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import CaseStudySiderbarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';

interface IFormInputs {
  name: string;
  company: string;
  phone: string;
  email: string;
  project: string;
  selectedStages: any[];
  addOns: any[];
}

const getSquadConfig = (selectedOffer: ExpertiseOffersSliderItem | null) => {
  if (!selectedOffer) {
    return {
      name: 'MVP Squad',
      price: '$4,500',
      description: '2 Developers + QA + PM',
      features: ['Build & launch your MVP in sprints', '4-hour U.S. overlap', 'Managed Agile sprints']
    };
  }

  const baseConfig = {
    name: selectedOffer.heading,
    price: selectedOffer.price,
    description: selectedOffer.description,
    features: selectedOffer.features || []
  };

  return baseConfig;
};

interface MiniSquadsModalProps {
  selectedOffer?: ExpertiseOffersSliderItem | null;
  variant?: 'cyan' | 'pink' | 'blue' | 'green' | 'purple' | 'yellow';
}

export const MiniSquadsModal: React.FC<MiniSquadsModalProps> = ({ selectedOffer = null, variant = 'blue' }) => {
  const squadConfig = getSquadConfig(selectedOffer);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Stage Options
  const stageOptions = [
    { id: 1, key: 'mvp', label: 'Just an idea / Pre-MVP (Month)', price: '+ $5000.00' },
    { id: 2, key: 'prototype', label: 'Prototype Ready (Month)', price: '+ $6000.00' },
    { id: 3, key: 'management', label: 'Live Products & Improvements (Month)', price: '+ $7000.00' },
    { id: 4, key: 'saas', label: 'Scaling Existing SaaS', price: 'Not sure yet' }
  ];

  // ✅ Add-on Options
  const addOnOptions = [
    { id: 1, key: 'design', label: 'Product Design Support (Month)', price: '+ $500.00' },
    { id: 2, key: 'backend', label: 'Extra Backend Developer (Month)', price: '+ $1200.00' },
    { id: 3, key: 'devops', label: 'DevOps Setup (One Time)', price: '+ $300.00' }
  ];

  const [isChecked, setChecked] = useState({
    mvp: false,
    prototype: false,
    management: false,
    saas: false,
    design: false,
    backend: false,
    devops: false
  });

  const [selectedStages, setSelectedStages] = useState<any[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control
  } = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      project: '',
      selectedStages: [],
      addOns: []
    }
  });

  // 🟢 Sync selected stages and addons
  useEffect(() => {
    const stages = stageOptions.filter((s) => isChecked[s.key]);
    const addons = addOnOptions.filter((a) => isChecked[a.key]);
    setSelectedStages(stages);
    setSelectedAddOns(addons);
    setValue('selectedStages', stages);
    setValue('addOns', addons);
  }, [isChecked, setValue]);

  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);

    if (data.selectedStages.length === 0 && data.addOns.length === 0) {
      setShowError(true);
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('company', data.company);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('project', data.project);
    formData.append('selectedStages', JSON.stringify(data.selectedStages));
    formData.append('addOns', JSON.stringify(data.addOns));

    try {
      const response = await fetch('/api/developers', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        reset();
        setChecked({
          mvp: false,
          prototype: false,
          management: false,
          saas: false,
          design: false,
          backend: false,
          devops: false
        });
      } else {
        setShowError(true);
        setShowSuccess(false);
      }
    } catch (error) {
      console.error(error);
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
          <div className={ContactFormModalStyles['modal-header']} />
          <h1 className={ContactFormModalStyles['modal-heading']}>Message received!</h1>
          <p className={ContactFormModalStyles['success__message']}>Thanks for considering Dev8X — we’ll reach out soon.</p>
        </div>
      ) : showError ? (
        <div className={ContactFormModalStyles['error']}>
          <div className={ContactFormModalStyles['modal-header']} />
          <h1 className={ContactFormModalStyles['modal-error']}>Message failed.</h1>
          <p className={ContactFormModalStyles['error__message']}>Please try again later or contact us directly.</p>
        </div>
      ) : (
        <>
          <div className={ContactFormModalStyles['modal-header']} />
          <div className={ContactFormModalStyles['modal-heading-wrapper']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
            <Pill variant={variant}>Let's Hire</Pill>
            <h1 className={ContactFormModalStyles['modal-heading']}>{squadConfig.name}</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}>
            {/* Intro */}
            <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
              <p>Fill in the blanks and we’ll respond in one business day.</p>
              <p>Just want to chat? Call or email — we’re a nice bunch.</p>
            </div>

            {/* Basic Info */}
            <FieldWrapper className="col-sm-1" label="What's your name?" error={errors.name?.message}>
              <Input type="text" placeholder="Your name here" {...register('name', { required: 'Please enter your name' })} />
            </FieldWrapper>

            <FieldWrapper className="col-sm-1" label="Company name?" error={errors.company?.message}>
              <Input type="text" placeholder="Widgets, Inc." {...register('company', { required: 'Please enter your company' })} />
            </FieldWrapper>

            {/* Contact Info */}
            <Fieldset label="How shall we contact you?">
              <FieldWrapper className="col-sm-1" error={errors.phone?.message}>
                <Input type="tel" placeholder="Phone Number" {...register('phone', { required: 'Please enter your phone number' })} />
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" error={errors.email?.message}>
                <Input type="email" placeholder="Email Address" {...register('email', { required: 'Please enter your email address' })} />
              </FieldWrapper>
            </Fieldset>

            {/* Project */}
            <FieldWrapper label="Tell us about the project" className="col-sm-2" error={errors.project?.message}>
              <Textarea placeholder="Describe your project idea..." {...register('project', { required: 'Please describe your project briefly' })} style={{ height: '200px' }} />
            </FieldWrapper>

            {/* Stages */}
            {/* <Controller
              name="selectedStages"
              control={control}
              render={() => (
                <Fieldset>
                  <FieldWrapper label="Current Stages">
                    {stageOptions.map((stage) => (
                      <ToggleField
                        key={stage.key}
                        label={stage.label}
                        secondaryLabel={stage.price}
                        checked={isChecked[stage.key as keyof typeof isChecked]}
                        setChecked={() =>
                          setChecked((prev) => ({
                            ...prev,
                            [stage.key]: !prev[stage.key as keyof typeof prev],
                          }))
                        }
                      />
                    ))}
                  </FieldWrapper>
                </Fieldset>
              )}
            /> */}

            {/* Add-Ons */}
            {/* <Controller
              name="addOns"
              control={control}
              render={() => (
                <Fieldset>
                  <FieldWrapper label="Add-Ons">
                    {addOnOptions.map((addon) => (
                      <ToggleField
                        key={addon.key}
                        label={addon.label}
                        secondaryLabel={addon.price}
                        checked={isChecked[addon.key as keyof typeof isChecked]}
                        setChecked={() =>
                          setChecked((prev) => ({
                            ...prev,
                            [addon.key]: !prev[addon.key as keyof typeof prev],
                          }))
                        }
                      />
                    ))}
                  </FieldWrapper>
                </Fieldset>
              )}
            /> */}

            {/* Plan Info */}
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

            <Button type="submit" variant="primary" context="contact" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
