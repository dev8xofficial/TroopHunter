import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import '@/shared/styles/globals.css';

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand theme',
      defaultValue: 'ferrari',
      toolbar: {
        title: 'Brand',
        items: [
          { value: 'ferrari', title: 'Ferrari' },
          { value: 'admin', title: 'Admin' },
          { value: 'client', title: 'Client' }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, ctx) => {
      const brandId = (ctx.globals.brand ?? 'ferrari') as 'ferrari' | 'admin' | 'client';
      return React.createElement(
        ThemeProvider,
        { brandId },
        React.createElement(Story, null)
      );
    }
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: 'centered'
  }
};

export default preview;
