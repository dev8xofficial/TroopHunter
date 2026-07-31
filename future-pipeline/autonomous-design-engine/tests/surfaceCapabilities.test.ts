import { describe, it, expect } from 'vitest';
import { checkSurfaceCapability } from '../src/surfaceCapabilities.js';
import type { Brief } from '../src/schema.js';

describe('Product-Surface Capability Check (C3.7)', () => {
  it('passes a standard marketing brief', () => {
    const brief: Brief = {
      client: 'Test',
      industry: 'Software',
      audience: 'Devs',
      goal: 'Sign up',
      section: {
        name: 'Hero Section',
        content: { headline: 'Welcome', cta: { text: 'Start', href: '#' } },
      },
    };

    const result = checkSurfaceCapability(brief);
    expect(result.pass).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  it('passes a form/login brief', () => {
    const brief: Brief = {
      client: 'Test',
      industry: 'Software',
      audience: 'Devs',
      goal: 'Log in',
      section: {
        name: 'Login Form',
        content: { email_input: 'Email', password_input: 'Password', submit_btn: 'Login' },
      },
    };

    const result = checkSurfaceCapability(brief);
    expect(result.pass).toBe(true); // Forms are supported
  });

  it('fails an email template brief', () => {
    const brief: Brief = {
      client: 'Test',
      industry: 'E-commerce',
      audience: 'Shoppers',
      goal: 'Buy now',
      section: {
        name: 'Weekly Newsletter Email',
        content: { header: 'News', products: '...' },
      },
    };

    const result = checkSurfaceCapability(brief);
    expect(result.pass).toBe(false);
    expect(result.violations[0]).toContain('Email Templates');
    expect(result.violations[0]).toContain('unsupported');
  });

  it('fails a data-viz brief', () => {
    const brief: Brief = {
      client: 'Test',
      industry: 'Finance',
      audience: 'Investors',
      goal: 'Show returns',
      section: {
        name: 'Performance Chart',
        content: { chart_dataset: '...', labels: '...' },
      },
    };

    const result = checkSurfaceCapability(brief);
    expect(result.pass).toBe(false);
    expect(result.violations[0]).toContain('Data Visualization');
  });
});
