import React from 'react';
import { graphql } from 'gatsby';

// sections
import { Hero } from '@components/Home';

export default ({ data }) => {
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
  if (!doc) return null;

  return <Hero data={doc.node} />;
};

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero {
              image
              label
              title
              description
            }
          }
        }
      }
    }
  }
`;
