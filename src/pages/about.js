import React from 'react';
import { graphql } from 'gatsby';
import { RichText, Elements } from 'prismic-reactjs';
import Hero from '@components/hero';

// styles
import styled from 'styled-components';
import { Container, Section, theme, media } from '@styles';

const { fontSizes } = theme;

const AboutContainer = styled(Section)`
  margin-bottom: 5rem;
  color: var(--color-text);
`;
const AboutWrapper = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  align-items: center;
`;
const StyledLabel = styled.h3`
  color: var(--color-tertiary);
  font-size: ${fontSizes.lg};
  margin: 0;
  padding: 0;
  ${media.phablet`font-size: ${fontSizes.md};`};
`;
const BaseCol = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`;
const LeftCol = styled(BaseCol)`
  img {
    width: 100%;
    user-select: none;
  }

  @media (min-width: 768px) {
    -ms-flex: 0 0 41.666667%;
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightCol = styled(BaseCol)`
  ${media.tablet`margin-top: 1.5rem;`};

  @media (min-width: 768px) {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
const StyledHeading = styled.h1`
  color: var(--color-gray-1000);
  font-size: ${fontSizes.h2};
  letter-spacing: 0.5px;
  margin: 0;
  padding-bottom: 1.5rem;
  ${media.tablet`
    font-size: ${fontSizes.xxl};
    padding-bottom: 1rem;
  `};
`;
const StyledDescription = styled.p`
  color: var(--color-gray-600);
  font-size: ${fontSizes.md};
  margin: 0;
  padding: 0;
`;
const InfoWrapper = styled(AboutWrapper)`
  justify-content: center;
`;
const StyledMD3 = styled(BaseCol)`
  text-align: center;
  margin-top: 3rem;
  img {
    width: 100%;
  }

  @media (min-width: 768px) {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
    margin-top: 5rem;
  }
`;
const StyledInfoHeading = styled.h2`
  font-size: ${fontSizes.xxl};
  ${media.desktop`font-size: ${fontSizes.xl};`};
  ${media.tablet`font-size: ${fontSizes.xxl};`};
`;

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};
const sectionSerializer = function (type, element, content, children, key) {
  var props = {};
  switch (type) {
    case Elements.paragraph:
      return React.createElement(
        StyledDescription,
        propsWithUniqueKey(props, key),
        children
      );
    case Elements.heading1:
      return React.createElement(
        StyledHeading,
        propsWithUniqueKey(props, key),
        children
      );
    case Elements.heading2:
      return React.createElement(
        StyledInfoHeading,
        propsWithUniqueKey(props, key),
        children
      );
    default:
      return null;
  }
};

export default ({ data }) => {
  const doc = data.prismic.allAboutpages.edges.slice(0, 1).pop();
  if (!doc) return null;

  const bannerArray = doc.node.banner[0];
  const aboutArray = doc.node.hero[0];
  const infoArray = doc.node.info;

  return (
    <>
      <Hero
        title={RichText.asText(bannerArray.title)}
        subtitle={bannerArray.label}
      />
      <AboutContainer>
        <Container normal>
          <AboutWrapper>
            <LeftCol>
              <img src={aboutArray.image.url} alt={aboutArray.image.alt} />
            </LeftCol>
            <RightCol>
              <ContentWrapper>
                <StyledLabel>{aboutArray.label}</StyledLabel>
                <RichText
                  render={aboutArray.title}
                  htmlSerializer={sectionSerializer}
                />
                <RichText
                  render={aboutArray.description}
                  htmlSerializer={sectionSerializer}
                />
                <br />
                <StyledDescription>
                  Brooklyn Tech is an elite eight NYC specialized institution
                  for secondary education. We are also the largest high school
                  in the United States with 6000 students. Our admission rate is
                  roughly 8% out of a 24,000 student applicant pool every year.
                </StyledDescription>
              </ContentWrapper>
            </RightCol>
          </AboutWrapper>
          <InfoWrapper>
            {infoArray.map((reference, i) => (
              <StyledMD3 key={i}>
                <img src={reference.image.url} alt={reference.image.alt} />
                <RichText
                  render={reference.title}
                  htmlSerializer={sectionSerializer}
                />
                <RichText
                  render={reference.description}
                  htmlSerializer={sectionSerializer}
                />
              </StyledMD3>
            ))}
          </InfoWrapper>
        </Container>
      </AboutContainer>
    </>
  );
};

export const query = graphql`
  {
    prismic {
      allAboutpages {
        edges {
          node {
            banner {
              label
              title
            }
            hero {
              label
              title
              description
              image
            }
            info {
              image
              title
              description
            }
          }
        }
      }
    }
  }
`;
