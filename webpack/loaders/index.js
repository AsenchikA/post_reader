import { isProd } from '../utils';

const getPostCssPlugins = () => {
  const plugins = ['postcss-nested'];

  if (isProd) {
    plugins.push('cssnano');
  }

  return plugins;
};

export const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: {
        plugins: getPostCssPlugins(),
      },
    },
    sourceMap: true,
  },
};

export const typingsCssModulesLoader = {
  loader: '@teamsupercell/typings-for-css-modules-loader',
};

export const cssLoader = {
  loader: 'css-loader',
  options: {
    esModule: false,
    modules: {
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
};
