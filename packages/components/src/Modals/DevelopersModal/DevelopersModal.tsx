import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Input } from '../../Input/TextField/Input';
import { Fieldset } from '../../Input/Fieldset/Fieldset';
import { Button } from '../../Input/Button/Button';
import { ToggleField } from '../../Input/ToggleField/ToggleField';
import { ListboxField, ListboxOptionType } from '../../Input/ListboxField/ListboxField';
import { HighlightBox } from '../../Input/HighlightBox/HighlightBox';

import CaseStudySiderbarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';
import ContactFormModalStyles from '../ContactFormModal/index.module.css';

interface IFormInputs {
  name: string;
  company: string;
  phone: string;
  email: string;
  plan: any;
  projectType: any;
  addOns: any[];
}

// ✅ Add-on Data
const addOnOptions = [
  { id: 1, label: 'Project Manager (Month)', secondaryLabel: '+ $3K', key: 'projectManager' },
  { id: 2, label: 'Backend Pairing (Month)', secondaryLabel: '+ $400.00', key: 'backendPairing' },
  { id: 3, label: 'DevOps Setup (One Time)', secondaryLabel: '+ $300.00', key: 'devOpsSetup' },
  { id: 4, label: 'Cancel Anytime', secondaryLabel: '', key: 'cancelAnytime' },
  { id: 5, label: 'Start in 1 Week', secondaryLabel: '', key: 'startInWeek' }
];

export const DevelopersModal: React.FC = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  // 🟢 Dropdown options
  const projectTypeOptions = [
    { id: 1, name: 'Frontend Development', value: 'frontend' },
    { id: 2, name: 'Backend Development', value: 'backend' },
    { id: 3, name: 'Full-Stack Development', value: 'fullstack' },
    { id: 4, name: 'UI/UX Design', value: 'design' },
    { id: 5, name: 'Mobile App Development', value: 'mobile' }
  ];

  const plans = [
    {
      id: 1,
      name: 'Junior Developer',
      price: '$600/month → $900/month after 3 months',
      start: 'Start in 7 days',
      trial: 'Fully refundable 7-day trial'
    }
  ];

  const [selectedProjectType, setSelectedProjectType] = useState<ListboxOptionType>(projectTypeOptions[0]);
  const [selectedPlan] = useState(plans[0]);
  const [isChecked, setChecked] = useState({
    projectManager: false,
    backendPairing: false,
    devOpsSetup: false,
    cancelAnytime: false,
    startInWeek: false
  });
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue
  } = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      plan: selectedPlan,
      projectType: selectedProjectType,
      addOns: []
    }
  });

  // 🟢 Sync Add-Ons with state
  useEffect(() => {
    const selected = addOnOptions.filter((item) => isChecked[item.key]);
    setSelectedAddOns(selected);
    setValue('addOns', selected);
  }, [isChecked, setValue]);

  // 🟢 Sync Project Type
  useEffect(() => {
    setValue('projectType', selectedProjectType);
  }, [selectedProjectType, setValue]);

  // 🟢 Sync Plan
  useEffect(() => {
    setValue('plan', selectedPlan);
  }, [selectedPlan, setValue]);

  const onSubmit = async (data: IFormInputs) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('company', data.company);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('plan', JSON.stringify(data.plan));
    formData.append('projectType', JSON.stringify(data.projectType));
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
          <p className={ContactFormModalStyles['success__message']}>Thanks for considering Dev8x for your project. We'll be in touch very soon.</p>
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
          <h1 className={ContactFormModalStyles['modal-heading']}>Let's Hire Developer</h1>

          <form onSubmit={handleSubmit(onSubmit)} className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}>
            <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
              <p>Fill in the blanks and we'll respond in one business day.</p>
              <p>Just want to chat? Call or email — we're a nice bunch.</p>
            </div>

            {/* Name */}
            <FieldWrapper className="col-sm-1" label="What's your name?" error={errors.name?.message}>
              <Input
                type="text"
                id="name"
                placeholder="Your name here"
                {...register('name', {
                  required: 'Please enter your name',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  maxLength: { value: 30, message: 'Name cannot exceed 30 characters' }
                })}
              />
            </FieldWrapper>

            {/* Company */}
            <FieldWrapper className="col-sm-1" label="Name of your company?" error={errors.company?.message}>
              <Input
                type="text"
                id="company"
                placeholder="Widgets, Inc"
                {...register('company', {
                  required: 'Please enter your company name',
                  minLength: { value: 2, message: 'Company name must be at least 2 characters' },
                  maxLength: { value: 40, message: 'Company name cannot exceed 40 characters' }
                })}
              />
            </FieldWrapper>

            {/* Contact Info */}
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

              {/* Project Type */}
              <FieldWrapper className="col-sm-2" label="Project Type" message="Select an option to proceed." error={errors.projectType?.message as string | undefined}>
                <Controller
                  name="projectType"
                  control={control}
                  rules={{ required: 'Please select a project type' }}
                  render={({ field }) => (
                    <ListboxField
                      options={projectTypeOptions}
                      selected={selectedProjectType}
                      setSelected={(option) => {
                        setSelectedProjectType(option);
                        field.onChange(option);
                      }}
                    />
                  )}
                />
              </FieldWrapper>
            </Fieldset>

            {/* Add-Ons */}
            <Controller
              name="addOns"
              control={control}
              rules={{ required: 'Please select at least one Add-On' }}
              render={() => (
                <Fieldset>
                  <FieldWrapper label="Add-Ons" message="Review your selected options below:" error={errors.addOns?.message}>
                    {addOnOptions.map((addon) => (
                      <ToggleField
                        key={addon.id}
                        label={addon.label}
                        secondaryLabel={addon.secondaryLabel}
                        checked={isChecked[addon.key as keyof typeof isChecked]}
                        setChecked={() =>
                          setChecked((prev) => ({
                            ...prev,
                            [addon.key]: !prev[addon.key as keyof typeof prev]
                          }))
                        }
                      />
                    ))}
                  </FieldWrapper>
                </Fieldset>
              )}
            />

            {/* Plans */}
            <FieldWrapper className="col-sm-2" label="Plans" message="Choose your preferred plan?">
              {plans.map((plan) => (
                <HighlightBox key={plan.id} variant="contained">
                  <h4>{plan.name}</h4>
                  <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${ContactFormModalStyles['mb-0']}`}>
                    <li>{plan.price}</li>
                    <li>{plan.start}</li>
                    <li>{plan.trial}</li>
                  </ul>
                </HighlightBox>
              ))}
            </FieldWrapper>

            {/* All Plans Include */}
            <FieldWrapper className="col-sm-2" label="All Plans Include">
              <HighlightBox variant="outlined">
                <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${ContactFormModalStyles['mb-0']}`}>
                  <li>Tech Lead Supervision</li>
                  <li>Transparent Time Tracking</li>
                  <li>Weekly Code Reports</li>
                  <li>4-Hour U.S. Time Overlap</li>
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
