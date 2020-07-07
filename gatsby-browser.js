import React from 'react';
import Layout from './src/components/Layouts';

import { registerLinkResolver } from '@prismicio/gatsby-source-prismic-graphql';
import { linkResolver } from './src/utils/linkResolver';

registerLinkResolver(linkResolver);

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
