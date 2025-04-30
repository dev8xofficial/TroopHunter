/* eslint-disable prettier/prettier */
import React from 'react';

import { FieldWrappper } from '../FieldWrapper/FieldWrapper';
import { Input } from '../Input/Input';
import { Fieldset } from '../Fieldset/Fieldset';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';

import styles from './index.module.css';

export const ContactFormModal: React.FC = (): JSX.Element => {
  return (
    <>
      <div className={styles['modal-container']}>
        <div className={styles['modal-header']}></div>
        <h1 className={styles['modal-heading']}>Let's get started.</h1>{' '}
        <form className={`${styles['contact-form']} grid-cols-2`} data-faitracker-form-bind="true">
          <div className={`col-full ${styles['modal-intro']}`}>
            <p>Fill in the blanks and we'll respond in one business day.</p>
            <p>Just want to chat? Call or email, we're a nice bunch.</p>
          </div>
          <FieldWrappper style="col-sm-1" label="What's your name?">
            <Input type="text" id=":r2:" name="name" placeholder="Your name here" />
          </FieldWrappper>
          <FieldWrappper style="col-sm-1" label="Name of your company?">
            <Input type="text" id=":r2:" name="name" placeholder="Your name here" />
          </FieldWrappper>
          <Fieldset label="How shall we contact you?">
            <FieldWrappper style="col-sm-1" label="Phone Number">
              <Input type="tel" id=":ri:" name="phone" placeholder="Phone Number" />
            </FieldWrappper>
            <FieldWrappper style="col-sm-1" label="Email Address">
              <Input type="email" id=":rj:" name="email" placeholder="Email Address" />
            </FieldWrappper>
            <FieldWrappper style="col-sm-1" label="Budget expectation" messageId=":rm:-help" message="Need a new Website? An App? Let us know how we can help.">
              <Input type="text" id=":rk:" name="budget" />
            </FieldWrappper>
            <FieldWrappper style="col-sm-1" label="Timeline" messageId=":rl:-help" message="If you have an ideal timeline or deadline, please let us know.">
              <Input type="text" id=":rl:" name="timeline" />
            </FieldWrappper>
          </Fieldset>
          <FieldWrappper label="Tell us about the project" messageId=":rl:-help" message="If you have an ideal timeline or deadline, please let us know.">
            <Textarea id=":rm:" name="timeline" />
          </FieldWrappper>
          <FieldWrappper label="How did you hear about us?">
            <Input type="text" id=":rc:" name="referral" placeholder="From a friend? From Google?" />
          </FieldWrappper>
          <Button>Submit</Button>
        </form>
      </div>
    </>
  );
};
