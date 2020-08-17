// eslint-disable-next-line import/no-extraneous-dependencies
require('now-env');
const algoliasearch = require('algoliasearch');

const IS_PROD = process.env.NODE_ENV === 'production';
const { REACT_APP_ALGOLIA_APP_ID, REACT_APP_ALGOLIA_SEARCH } = process.env;
const algolia = algoliasearch(
  REACT_APP_ALGOLIA_APP_ID,
  REACT_APP_ALGOLIA_SEARCH,
);
const initIndex = (index) => {
  return algolia.initIndex(IS_PROD ? index : index);
};

module.exports = initIndex;
