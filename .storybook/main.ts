module.exports = {
  stories: ['../src/**/story.tsx', '../src/**/*.story.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
};
