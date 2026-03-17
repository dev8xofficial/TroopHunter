import type { Meta, StoryObj } from '@storybook/react';

// Simple test component
const TestButton = ({ children, variant = 'primary' }: { children: string; variant?: 'primary' | 'secondary' }) => (
  <button
    style={{
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      background: variant === 'primary' ? '#ef4444' : '#6b7280',
      color: 'white',
      cursor: 'pointer'
    }}
  >
    {children}
  </button>
);

const meta: Meta<typeof TestButton> = {
  title: 'Test/Button',
  component: TestButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary']
    },
    children: {
      control: 'text'
    }
  },
  args: {
    children: 'Click me',
    variant: 'primary'
  }
};

export default meta;
type Story = StoryObj<typeof TestButton>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};
