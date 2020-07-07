import React from 'react';
import { graphql } from 'gatsby';
import { Signup } from '@app';

export default ({ data }) => {
  const doc = data.prismic.allSignups.edges.slice(0, 1).pop();

  return <Signup data={doc.node} />;
};

export const query = graphql`
  {
    prismic {
      allSignups {
        edges {
          node {
            image
            title
            label
          }
        }
      }
    }
  }
`;
