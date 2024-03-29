// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mergeConfig } = require('vite');

module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  'staticDirs': [
    '../public',
    '../src/assets',
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