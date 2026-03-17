import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/shared/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'MBO/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    state: { control: { type: 'select' }, options: ['default', 'error', 'disabled'] },
    label: { control: 'text' },
    placeholder: { control: 'text' }
  },
  args: {
    id: 'email',
    label: 'Email',
    placeholder: 'you@company.com',
    size: 'md',
    state: 'default'
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    state: 'error'
  }
};

export const Disabled: Story = {
  args: {
    state: 'disabled'
  }
};

