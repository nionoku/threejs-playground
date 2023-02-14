import { mergeConfig } from 'vite';

module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  'addons': [
    '@storybook/addon-essentials',
  ],
  'framework': '@storybook/html',
  'core': {
    'builder': '@storybook/builder-vite',
  },
  'features': {
    'storyStoreV7': true,
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      base: process.env.BASE_PATH || config.base,
    });
  },
};