import React from 'react';
import { graphql, navigate } from 'gatsby';
import { ROUTES, isloggedin } from '@utils';

// components
import { Hero } from '@components/Home';

const RenderBody = ({ data }) => {
  return <Hero data={data} />;
};

export default ({ data }) => {
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop();
  if (!doc) return null;
  if (isloggedin()) {
    navigate(ROUTES.DASHBOARD);
    return null;
  }

  return <RenderBody data={doc.node} />;
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
