import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

const meta: Meta<typeof Card> = {
  title: 'MBO/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <div className="w-[420px]">
      <Card>
      <Card.Header>
        <div className="text-lg font-semibold">Card title</div>
        <div className="text-sm text-[var(--color-text-muted)]">Supporting copy for the card.</div>
      </Card.Header>
      <Card.Body>
        <div className="text-sm text-[var(--color-text-primary)]">
          This card is styled via semantic tokens and should adapt to brand switching.
        </div>
      </Card.Body>
      <Card.Footer className="flex justify-end">
        <Button size="sm" variant="secondary">
          Dismiss
        </Button>
      </Card.Footer>
      </Card>
    </div>
  )
};

