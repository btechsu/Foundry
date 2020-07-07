import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

// components
import Head from './Head';
import Nav from '@components/nav';
import Footer from '@components/footer';

// styles
import { GlobalStyle } from '@styles';

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
              siteUrl
              description
            }
          }
          prismic {
            allHomepages {
              edges {
                node {
                  footer {
                    text
                  }
                }
              }
            }
          }
        }
      `}
      render={(site) => {
        const doc = site.prismic.allHomepages.edges.slice(0, 1).pop();

        return (
          <>
            <Head metadata={site.site.siteMetadata} />
            <GlobalStyle />
            <Nav />
            <div id="content">{children}</div>
            <Footer data={doc.node} />
          </>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
