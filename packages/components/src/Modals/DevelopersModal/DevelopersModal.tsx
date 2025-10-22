import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Input } from '../../Input/TextField/Input';
import { Fieldset } from '../../Input/Fieldset/Fieldset';
import { Button } from '../../Input/Button/Button';
import { ToggleField } from '../../Input/ToggleField/ToggleField';
import { ListboxField } from '../../Input/ListboxField/ListboxField';

import CaseStudySiderbarStyles from '../../Surfaces/CaseStudySidebar/index.module.css';
import ContactFormModalStyles from '../ContactFormModal/index.module.css';
import { HighlightBox } from '../../Input/HighlightBox/HighlightBox';

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
}

export const DevelopersModal: React.FC = (): JSX.Element => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  // 🟢 STEP 1: Create your dropdown options
  const projectTypeOptions = [
    { id: 1, name: 'Frontend Development', value: 'frontend' },
    { id: 2, name: 'Backend Development', value: 'backend' },
    { id: 3, name: 'Full-Stack Development', value: 'fullstack' },
    { id: 4, name: 'UI/UX Design', value: 'design' },
    { id: 5, name: 'Mobile App Development', value: 'mobile' }
  ];

  const addOnOptions = [
    { id: 1, name: 'Dedicated Project Manager', value: 'project_manager' },
    { id: 2, name: 'Daily Standup Updates', value: 'daily_updates' },
    { id: 3, name: 'Code Documentation', value: 'documentation' },
    { id: 4, name: 'QA & Testing Support', value: 'qa_testing' },
  ];
  // 🧩 Step 1: Plans Data
  const plans = [
    {
      id: 1,
      name: 'Junior Developer',
      price: '$600/month → $900/month after 3 months',
      start: 'Start in 7 days',
      trial: 'Fully refundable 7-day trial',
    }
    // {
    //   id: 2,
    //   name: 'Mid Developer',
    //   price: '$900/month → $1200/month after 3 months',
    //   start: 'Start in 5 days',
    //   trial: 'Fully refundable 7-day trial',
    // },
    // {
    //   id: 3,
    //   name: 'Senior Developer',
    //   price: '$1500/month → $1800/month after 3 months',
    //   start: 'Start in 3 days',
    //   trial: 'Fully refundable 7-day trial',
    // },
  ];

  // 🧠 Step 2: State Management
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);


  const [selectedProjectType, setSelectedProjectType] = useState(projectTypeOptions[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue // 🟢 added this for syncing dropdown with form data
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

  useEffect(() => {
    setValue('project', selectedAddOns.join(', '));
  }, [selectedAddOns, setValue]);

  useEffect(() => {
    setValue('budget', selectedProjectType.value);
  }, [selectedProjectType, setValue]);

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
          <p className={ContactFormModalStyles['success__message']}>
            Thanks for considering Dev8x for your project, we'll be in touch very soon.
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
          <h1 className={ContactFormModalStyles['modal-heading']}>Let's Hire Developer</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}>
            <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
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
              <FieldWrapper
                className="col-sm-2"
                label="Project Type"
                message="A transparent budget will help us ensure expectations are met."
                error={errors.budget?.message}
              >
                <ListboxField
                  options={projectTypeOptions}
                  selected={selectedProjectType}
                />
              </FieldWrapper>
            </Fieldset>

            <Fieldset>
              <FieldWrapper label="Tell us about the project">
                <ToggleField label="DevOps Setup (One Time)" secondaryLabel="+ $300.00" checked={isChecked} setChecked={setIsChecked} />
              </FieldWrapper>
            </Fieldset>

            <FieldWrapper
              className={`col-sm-2`}
              label="Plans"
              error={errors.budget?.message}
            >
              <HighlightBox variant='contained'>
                <h4>Junior Developer</h4>
                <ul
                  className={`${CaseStudySiderbarStyles['custom-icon-list']} ${ContactFormModalStyles['mb-0']}`}
                >
                  <li>$600/month → $900/month after 3 months</li>
                  <li>Start in 7 days</li>
                  <li>Fully refundable 7-day trial</li>
                </ul>
              </HighlightBox>
            </FieldWrapper>

            <FieldWrapper
              className="col-sm-2"
              label="All Plan Include"
              error={errors.budget?.message}
            >
              <HighlightBox variant='outlined'>
                <ul className={`${CaseStudySiderbarStyles['custom-icon-list']} ${ContactFormModalStyles['mb-0']}`}>
                  <li>Digital marketing mindset: SEO, SEM, SMM, Email, Content.</li>
                  <li>Market research, competitor analysis, and consumer psychology.</li>
                  <li>Content & campaign basics (blogs, social media, email).</li>
                  <li>App market research & keyword strategy (SensorTower, AppTweak).</li>
                </ul>
              </HighlightBox>
            </FieldWrapper>

            <Button
              type="button"
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
      )
      }
    </div >
  );
};
