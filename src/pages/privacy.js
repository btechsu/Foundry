import React from 'react';
import { graphql } from 'gatsby';
import { RichText, Elements } from 'prismic-reactjs';
import Hero from '@components/hero';

// styles
import styled from 'styled-components';
import { Container, Section, theme, mixins, media } from '@styles';

const { fontSizes } = theme;

const PrivacyContainer = styled(Section)`
  margin-bottom: 5rem;
  color: var(--color-text);
`;
const StyledH1 = styled.h1`
  font-size: ${fontSizes.h1};
  ${media.tablet`font-size: ${fontSizes.xxl};`};
  font-weight: var(--font-weight-bold);
`;
const StyledH2 = styled.h2`
  font-size: ${fontSizes.xxl};
  ${media.tablet`font-size: ${fontSizes.xl};`};
  font-weight: var(--font-weight-normal);
`;
const StyledH3 = styled.h3`
  font-size: ${fontSizes.xl};
  ${media.tablet`font-size: ${fontSizes.lg};`};
  font-weight: var(--font-weight-normal);
`;
const StyledP = styled.p`
  font-size: ${fontSizes.md};
  font-weight: var(--font-weight-light);
`;
const StyledLink = styled.a`
  ${mixins.inlineLink};
`;

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};
const sectionSerializer = function (type, element, content, children, key) {
  var props = {};
  switch (type) {
    case Elements.heading1:
      return React.createElement(
        StyledH1,
        propsWithUniqueKey(props, key),
        children
      );
    case Elements.heading2:
      return React.createElement(
        StyledH2,
        propsWithUniqueKey(props, key),
        children
      );
    case Elements.heading3:
      return React.createElement(
        StyledH3,
        propsWithUniqueKey(props, key),
        children
      );
    case Elements.paragraph:
      return React.createElement(
        StyledP,
        propsWithUniqueKey(props, key),
        children
      );
    case Elements.hyperlink:
      return React.createElement(
        StyledLink,
        propsWithUniqueKey(props, key),
        children
      );
    default:
      return null;
  }
};

export default ({ data }) => {
  if (!doc) return null;

  const doc = data.prismic.allPrivacys.edges.slice(0, 1).pop();
  const policyText = doc.node.policy[0].text;
  const bannerArray = doc.node.banner[0];
  const split = bannerArray.date.split('-');

  return (
    <>
      <Hero
        title="Privacy Policy"
        subtitle={`Last updated: ` + split[1] + '/' + split[2] + '/' + split[0]}
      />
      <PrivacyContainer>
        <Container normal>
          <RichText render={policyText} htmlSerializer={sectionSerializer} />
        </Container>
      </PrivacyContainer>
    </>
  );
};

export const query = graphql`
  {
    prismic {
      allPrivacys {
        edges {
          node {
            banner {
              date
              title
            }
            policy {
              text
            }
          }
        }
      }
    }
  }
`;
