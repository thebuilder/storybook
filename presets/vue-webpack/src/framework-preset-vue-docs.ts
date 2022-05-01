import { StorybookConfig } from '@storybook/webpack-tools';
import { hasDocsOrControls } from '@storybook/docs-tools';

export const webpackFinal: StorybookConfig['webpackFinal'] = (config, options) => {
  if (!hasDocsOrControls(options)) return config;

  let vueDocgenOptions = {};

  options.presetsList?.forEach((preset) => {
    if (preset.name.includes('addon-docs') && preset.options.vueDocgenOptions) {
      const appendableOptions = preset.options.vueDocgenOptions;
      vueDocgenOptions = {
        ...vueDocgenOptions,
        ...appendableOptions,
      };
    }
  });

  config.module.rules.push({
    test: /\.vue$/,
    loader: require.resolve('vue-docgen-loader', {
      paths: [require.resolve('@storybook/preset-vue-webpack')],
    }),
    enforce: 'post',
    options: {
      docgenOptions: {
        alias: config.resolve.alias,
        ...vueDocgenOptions,
      },
    },
  });
  return config;
};
