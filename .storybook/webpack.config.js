const path = require("path");
const webpack = require('webpack');

const isCi = process.env.CI === 'true';
module.exports = ({config}) => {
  config.resolve.alias.app = path.resolve(__dirname, '../src/app/');
  config.resolve.alias.static = path.resolve(__dirname, '../src/static/');

  // the existing babel-loader is unnecessary and slow given our tsx loader
  config.module.rules = config.module.rules.filter(rule => {
    return !rule.test.test('test.jsx');
  });

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      !isCi && {
        loader: 'babel-loader',
        options: {plugins: ['react-hot-loader/babel']}
      },
      {
        loader: "ts-loader",
        options: {
          configFile: isCi ? 'tsconfig.storybook.build.json' : 'tsconfig.storybook.json',
          transpileOnly: isCi
        }
      },
    ].filter(Boolean)
  });

  const existingCssLoader = config.module.rules.find(rule => {
    return rule.test.test('test.css');
  });

  let sourceMap = undefined;
  if (isCi) {
    sourceMap = false;
  }
  config.module.rules[config.module.rules.indexOf(existingCssLoader)] = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            compileType: 'module',
            localIdentName: '[hash:base64:5]',
            exportLocalsConvention: 'camelCase',
          },
          sourceMap: sourceMap,
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: sourceMap,
          implementation: require('sass'),
        }
      }
    ]
  };

  const existingFileLoader = config.module.rules.find(rule => {
    return rule.test.test('test.svg');
  });

  config.module.rules[config.module.rules.indexOf(existingFileLoader)] = {
    test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|png|svg|eot|ttf|otf|woff|woff2|data)$/,
    use: 'file-loader'
  };

  config.module.rules.push({
    test: /\.(pdf|xlsx)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  });

  // every unused loader adds startup and build time
  config.module.rules = config.module.rules.filter(r => {
    if (r.loader && r.loader.includes('url-loader')) {
      return false;
    }

    return true;
  });

  config.resolve.symlinks = false;
  config.resolve.cacheWithContext = false;
  config.resolve.extensions = ['.js', '.json', '.ts', '.tsx'];
  config.optimization.minimize = false;
  config.optimization.removeAvailableModules = false;
  config.optimization.removeEmptyChunks = false;
  config.optimization.splitChunks = false;
  config.performance.hints = false;
  config.output.pathinfo = false;
  config.devtool = isCi ? undefined : 'cheap-module-eval-source-map';
  config.plugins = config.plugins.filter(p => p.constructor.name !== 'CaseSensitivePathsPlugin');
  if (isCi) {
    config.plugins = config.plugins.filter(p => p.constructor.name !== 'ProgressPlugin');
  }
  config.plugins.push(new webpack.DefinePlugin({
    STORYBOOK: true,
    CI: isCi,
  }));
  return config;
};
