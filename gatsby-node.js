const path = require('path');

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
// https://www.gatsbyjs.org/docs/debugging-html-builds/
// https://github.com/gregberge/loadable-components
exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-editor-js/,
            use: loaders.null(),
          },
          {
            test: /@editorjs/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@app': path.resolve(__dirname, 'src/components/App'),
        '@Firebase': path.resolve(__dirname, 'src/components/Firebase'),
      },
    },
  });
};
