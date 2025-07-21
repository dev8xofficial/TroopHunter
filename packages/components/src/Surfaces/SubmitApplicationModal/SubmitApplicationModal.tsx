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
  location?: string;
  position?: string;
  startDate?: string;
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
      location: '',
      position: '',
      startDate: '',
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
          <h1 className={ContactFormModalStyles['modal-heading']}>Application submitted</h1>
          <p className={ContactFormModalStyles['success__message']}>
            Thank you for your interest in joining <strong>Dev8X</strong>. We’ve received your application and will review your submission shortly. If your profile aligns with our needs, a member of our team will be in touch.
          </p>
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

            <FieldWrapper label="Your good name, please" required={true} className="col-sm-1" error={errors.name?.message}>
              <Input
                type="text"
                id="name"
                placeholder="Type your name here"
                {...register('name', {
                  required: 'Please enter your name',
                  maxLength: { value: 20, message: 'Name cannot exceed 20 characters' }
                })}
              />
            </FieldWrapper>

            <FieldWrapper label="Best email to reach you" required={true} className="col-sm-1" error={errors.email?.message}>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: "Email can't be blank",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'That doesn’t look like an email'
                  }
                })}
              />
            </FieldWrapper>

            <FieldWrapper label="Preferred contact number" required={true} className="col-sm-1" error={errors.phone?.message}>
              <Input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                {...register('phone', {
                  required: 'Phone number needed',
                  pattern: {
                    value: /^[0-9+\-()\s]*$/,
                    message: 'Invalid phone number format'
                  }
                })}
              />
            </FieldWrapper>

            <FieldWrapper label="Where are you located?" required={true} className="col-sm-1" error={errors.location?.message}>
              <Input
                type="text"
                id="location"
                placeholder="City or country"
                {...register('location', {
                  required: "Location can't be empty",
                  maxLength: { value: 100, message: 'Location cannot exceed 100 characters' }
                })}
              />
            </FieldWrapper>

            <Fieldset>
              <FieldWrapper label="Role you're applying for" required={true} className="col-sm-1" error={errors.position?.message}>
                <Input
                  type="text"
                  id="position"
                  placeholder="e.g., UI/UX Designer"
                  {...register('position', {
                    required: 'Let us know the position'
                  })}
                />
              </FieldWrapper>

              <FieldWrapper label="When can you start?" required={true} className="col-sm-1" error={errors.startDate?.message}>
                <Input
                  type="text"
                  id="startDate"
                  placeholder="DD-MM-YYYY format, please"
                  {...register('startDate', {
                    required: 'Date is required'
                  })}
                />
              </FieldWrapper>

              {selectedRole && !selectedRole.trim().toLowerCase().includes('intern') && (
                <FieldWrapper className="col-sm-1" label="Expected salary">
                  <Input type="text" id="salary" placeholder="Share your amount" {...register('salary')} />
                </FieldWrapper>
              )}

              <FieldWrapper className="col-sm-1" label="LinkedIn profile link">
                <Input type="url" id="linkedin" placeholder="Paste LinkedIn URL" {...register('linkedin')} />
              </FieldWrapper>

              <FieldWrapper className="col-sm-1" label="Portfolio or website link">
                <Input type="url" id="portfolio" placeholder="Paste website/portfolio URL" {...register('portfolio')} />
              </FieldWrapper>
            </Fieldset>

            <Controller
              name="upload"
              control={control}
              rules={{ required: 'File is required' }}
              render={({ field: { onChange, name } }) => (
                <FieldWrapper id="upload" label="Upload your Resume/CV" required={true} messageId="upload-help" error={errors.upload?.message}>
                  <FileUpload onChange={onChange} name={name} />
                </FieldWrapper>
              )}
            />

            <FieldWrapper label="Why you'd like to join us?">
              <Textarea id="whyJoin" placeholder="Share your thoughts" {...register('whyJoin')} />
            </FieldWrapper>

            <FieldWrapper label="Project you're proud of">
              <Textarea id="project" placeholder="Briefly describe your work" {...register('project')} />
            </FieldWrapper>

            <FieldWrapper label="How did you find us?">
              <Textarea id="opportunity" placeholder="e.g., LinkedIn, Google, a friend" {...register('opportunity')} />
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
