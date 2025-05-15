import React, { useState } from 'react';

import { FieldWrappper } from '../FieldWrapper/FieldWrapper';
import { Input } from '../Input/Input';
import { Fieldset } from '../Fieldset/Fieldset';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';

import styles from './index.module.css';

export const ContactFormModal: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    budget: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showErrorTab, setShowErrorTab] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Please enter your name';
    if (!formData.company) newErrors.company = 'Please enter your company name';
    if (!formData.phone) newErrors.phone = 'Please enter your phone number';
    if (!formData.email) newErrors.email = 'Please enter your email address';
    if (!formData.budget) newErrors.budget = 'Please enter your budget';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowErrorTab(true);
    } else {
      setErrors({});
      setShowErrorTab(false);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className={styles['modal-container']}>
      <h1 className={styles['modal-heading']}>Let's get started.</h1>
      <form onSubmit={handleSubmit} className={`${styles['contact-form']} grid-cols-2`}>
        <div className={`col-full ${styles['modal-intro']}`}>
          <p>Fill in the blanks and we'll respond in one business day.</p>
          <p>Just want to chat? Call or email, we're a nice bunch.</p>
        </div>

        <FieldWrappper className="col-sm-1" label="What's your name?" error={errors.name}>
          <Input type="text" id=":r2:" name="name" placeholder="Your name here" value={formData.name} onChange={handleChange} />
        </FieldWrappper>

        <FieldWrappper className="col-sm-1" label="Name of your company?" error={errors.company}>
          <Input type="text" id=":r2:" name="company" placeholder="Company name" value={formData.company} onChange={handleChange} />
        </FieldWrappper>

        <Fieldset label="How shall we contact you?" error={errors.phone || errors.email || errors.budget}>
          <FieldWrappper className="col-sm-1" error={errors.phone}>
            <Input type="tel" id=":ri:" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          </FieldWrappper>

          <FieldWrappper className="col-sm-1" error={errors.email}>
            <Input type="email" id=":rj:" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          </FieldWrappper>

          <FieldWrappper className="col-sm-1" label="Budget expectation" message="A transparent budget will help us ensure expectations are met." error={errors.budget}>
            <Input type="text" id=":rk:" name="budget" value={formData.budget} onChange={handleChange} />
          </FieldWrappper>

          <FieldWrappper className="col-sm-1" label="Timeline" message="If you have an ideal timeline or deadline, please let us know." messageId=":rl:">
            <Input type="text" id=":rl:" name="timeline" placeholder="Optional" />
          </FieldWrappper>
        </Fieldset>

        <FieldWrappper label="Tell us about the project">
          <Textarea name="project" id=" :rm:" />
        </FieldWrappper>

        <FieldWrappper label="How did you hear about us?">
          <Input type="text" id=":rc:" name="referral" placeholder="From a friend? From Google?" />
        </FieldWrappper>

        <Button type="submit" variant="primary" context="contact" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};
