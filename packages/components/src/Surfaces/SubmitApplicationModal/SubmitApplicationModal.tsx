import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { selectedRoleAtom, selectedRoleFirstParagraphAtom, selectedRoleThirdParagraphAtom } from '../OpenRolesList/OpenRolesList';

import { FileUpload } from '../FileUpload/FileUpload';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import { Input } from '../Input/Input';
import { Fieldset } from '../Fieldset/Fieldset';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';

import ContactFormModalStyles from '../ContactFormModal/index.module.css';

interface IFormInputs {
  name: string;
  phone: string;
  email: string;
  project?: string;
  upload?: File[];
  referral?: string;
  address?: string;
  position?: string;
  preferredDate?: string;
  salary?: string;
  linkedin?: string;
  portfolio?: string;
  opportunity?: string;
  whyJoin?: string;
}

export const SubmitApplicationModal: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const selectedRole = useAtomValue(selectedRoleAtom);
  const selectedRoleFirstParagraph = useAtomValue(selectedRoleFirstParagraphAtom);
  const selectedRoleThirdParagraph = useAtomValue(selectedRoleThirdParagraphAtom);

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
      phone: '',
      email: '',
      project: '',
      referral: '',
      address: '',
      position: '',
      preferredDate: '',
      salary: '',
      linkedin: '',
      portfolio: '',
      opportunity: '',
      whyJoin: ''
    }
  });

  // Effect to update form when selectedRole changes
  useEffect(() => {
    if (selectedRole) {
      setValue('position', selectedRole);
    }
  }, [selectedRole, setValue]);

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
      const response = await fetch('/api/submit', {
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
          <p className={ContactFormModalStyles['success__message']}>Thanks for considering Dev8x for your project, we'll be in touch very soon.</p>
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
          <h1 className={ContactFormModalStyles['modal-heading']}>{selectedRole ? ` ${selectedRole}` : '.'}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={`${ContactFormModalStyles['contact-form']} grid-cols-2`}>
            <div className={`col-full ${ContactFormModalStyles['modal-intro']}`}>
              <p>{selectedRoleFirstParagraph}</p>
              <p>{selectedRoleThirdParagraph}</p>
            </div>

            <FieldWrapper label="What's your name?" className="col-sm-1" error={errors.name?.message}>
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

            <FieldWrapper label="What's your email?" className="col-sm-1" error={errors.email?.message}>
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

            <FieldWrapper label="How shall we contact you?" className="col-sm-1" error={errors.phone?.message}>
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

            <FieldWrapper label="Where are you located?" className="col-sm-1" error={errors.address?.message}>
              <Input
                type="text"
                id="address"
                placeholder="Current Location"
                {...register('address', {
                  required: 'Please enter your address',
                  maxLength: { value: 100, message: 'Address cannot exceed 100 characters' }
                })}
              />
            </FieldWrapper>

            <Fieldset>
              <FieldWrapper label="What position are you applying for?" className="col-sm-1" error={errors.position?.message}>
                <Input
                  type="text"
                  id="position"
                  placeholder="Tell about the position"
                  {...register('position', {
                    required: 'Please enter the position'
                  })}
                />
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" label="Preferred Start Date">
                <Input
                  type="text"
                  id="preferredDate"
                  placeholder="Enter the preferred start date"
                  {...register('preferredDate', {
                    required: 'Please enter the Date'
                  })}
                />
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" label="Expected Salary (optional)">
                <Input type="text" id="salary" placeholder="Enter Your Salary" {...register('salary')} />
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" label="LinkedIn Profile (optional)">
                <Input type="url" id="linkedin" placeholder="Enter Your LinkedIn Profile" {...register('linkedin')} />
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" label="Portfolio / Website (optional)">
                <Input type="url" id="portfolio" placeholder="Enter Your Portfolio / Website" {...register('portfolio')} />
              </FieldWrapper>
            </Fieldset>

            <Controller
              name="upload"
              control={control}
              render={({ field: { onChange, name } }) => (
                <FieldWrapper id="upload" label="Upload Resume / CV" messageId="upload-help" error="">
                  <FileUpload onChange={onChange} name={name} />
                </FieldWrapper>
              )}
            />

            <FieldWrapper label="How did you hear about us?">
              <Input type="text" id="referral" placeholder="From a friend? From Google?" {...register('referral')} />
            </FieldWrapper>

            <FieldWrapper label="Why do you want to join us?">
              <Textarea id="whyJoin" {...register('whyJoin')} />
            </FieldWrapper>

            <FieldWrapper label="Briefly us about the project you're proud of">
              <Textarea id="project" {...register('project')} />
            </FieldWrapper>

            <FieldWrapper label="How did you hear about this opportunity?">
              <Textarea id="opportunity" {...register('opportunity')} />
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
