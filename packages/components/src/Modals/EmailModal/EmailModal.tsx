'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, Underline } from 'lucide-react';

import { FieldWrapper } from '../../Input/FieldWrapper/FieldWrapper';
import { Input } from '../../Input/TextField/Input';
import { Button } from '../../Input/Button/Button';

import styles from './index.module.css';

const SENDER_OPTIONS = [
  { label: 'General Contact', value: 'contact@dev8x.com' },
  { label: 'Careers Team', value: 'careers@dev8x.com' }
];

interface EmailFormInputs {
  from: string;
  to: string;
  cc: string;
  subject: string;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateMultipleEmails = (value: string) => {
  if (!value) return true;
  const emails = value
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  const allValid = emails.every((email) => emailRegex.test(email));
  return allValid || 'One or more CC addresses are invalid';
};

export const EmailModal: React.FC<{ defaultTo?: string; onSent?: () => void }> = ({ defaultTo = '', onSent }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<EmailFormInputs>({
    defaultValues: {
      from: SENDER_OPTIONS[0].value,
      to: defaultTo,
      cc: '',
      subject: '',
      message: ''
    }
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setValue('message', editor.getHTML(), { shouldValidate: true });
    }
  });

  // CLEANUP: Fixes "Node cannot be found" error when modal closes/changes
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const onSubmit = async (data: EmailFormInputs) => {
    setStatus('sending');
    setServerError('');

    console.log('📤 Sending email...', data);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const payload = await response.json().catch(() => null);

      if (response.ok) {
        console.group('✅ EMAIL SENT SUCCESSFULLY');
        console.log('Message ID:', payload?.messageId);
        console.log('Accepted Recipients:', payload?.accepted);
        console.log('SMTP Response:', payload?.response);
        console.groupEnd();

        setStatus('sent');
        reset();
        editor?.commands.setContent('');
        onSent?.();
      } else {
        console.group('❌ EMAIL FAILED');
        console.error('Status:', response.status);
        console.error('Payload:', payload);
        console.groupEnd();

        setServerError(payload?.message || 'Failed to send email.');
        setStatus('error');
      }
    } catch (error) {
      console.error('🌐 Network Error:', error);
      setServerError('A network error occurred.');
      setStatus('error');
    }
  };

  return (
    <div className={styles['modal']}>
      {status === 'sent' ? (
        <div className={styles['result']}>
          <h2 className={styles['resultTitle']}>Sent</h2>
          <p className={styles['resultMessage']}>The email has been queued for delivery.</p>
          <Button variant="secondary" onClick={() => setStatus('idle')}>
            Compose another
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
          {status === 'error' && <div className={styles['errorBanner']}>{serverError}</div>}

          <FieldWrapper label="From" error={errors.from?.message}>
            <select {...register('from')} className={styles['select']}>
              {SENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.value})
                </option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper label="To" error={errors.to?.message}>
            <Input type="email" {...register('to', { required: 'Recipient is required', pattern: { value: emailRegex, message: 'Invalid email' } })} />
          </FieldWrapper>

          <FieldWrapper label="CC (Comma separated)" error={errors.cc?.message}>
            <Input type="email" placeholder="team@dev8x.com, manager@dev8x.com" {...register('cc', { validate: validateMultipleEmails })} />
          </FieldWrapper>

          <FieldWrapper label="Subject" error={errors.subject?.message}>
            <Input type="text" {...register('subject', { required: 'Subject is required' })} />
          </FieldWrapper>

          <FieldWrapper label="Message" error={errors.message?.message}>
            <div className={styles['editorWrap']} data-invalid={!!errors.message}>
              <div className={styles['toolbar']}>
                <button type="button" title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? styles.active : ''}>
                  <Bold size={16} strokeWidth={2.5} />
                </button>

                <button type="button" title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? styles.active : ''}>
                  <Italic size={16} strokeWidth={2.5} />
                </button>

                <button type="button" title="Bullet List" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive('bulletList') ? styles.active : ''}>
                  <List size={16} strokeWidth={2.5} />
                </button>
                <button type="button" title="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={editor?.isActive('underline') ? styles.active : ''}>
                  <Underline size={16} strokeWidth={2.5} />
                </button>
              </div>

              <EditorContent editor={editor} className={styles.editor} data-placeholder="Write your email here..." />
            </div>
            <input type="hidden" {...register('message', { required: 'Message is required' })} />
          </FieldWrapper>

          <div className={styles['actions']}>
            <Button type="submit" variant="primary" isLoading={status === 'sending'}>
              Send Email
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
