import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Elements } from 'prismic-reactjs';

// styles
import styled from 'styled-components';
import { mixins, theme, media, GridCol } from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

const ElementsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: auto auto;
  grid-auto-rows: max-content auto;
  margin-top: 4rem;
`;
const TitleContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr max-content;
`;
const StyledTitle = styled.h2`
  color: var(--color-text);
  margin: 0;
  font-size: ${fontSizes.xl};
`;
const CardGrid = styled.div`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(18rem, 1fr));

  ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));`};
`;
const SocialContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  align-items: flex-start;
`;
const StyledImage = styled.img`
  position: relative;
  margin-right: 2rem;
  height: 3rem;
  width: 3rem;
  vertical-align: middle;
  border-style: none;
`;
const Title = styled.h3`
  color: var(--color-text);
  font-size: ${fontSizes.xl};
  text-transform: uppercase;
`;
const Text = styled.p`
  color: var(--color-gray-700);
  font-size: ${fontSizes.md};
`;
const StyledLink = styled.a`
  ${mixins.inlineLink}
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    padding-right: 0.375rem;
  }
`;

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};
const sectionSerializer = function (type, element, content, children, key) {
  var props = {};
  switch (type) {
    case Elements.heading3:
      return React.createElement(
        Title,
        propsWithUniqueKey(props, key),
        children
      );
    case Elements.paragraph:
      return React.createElement(
        Text,
        propsWithUniqueKey(props, key),
        children
      );
    default:
      return null;
  }
};

const SocialSection = ({ data }) => {
  const socialArray = data.social;

  return (
    <GridCol spans={12}>
      <ElementsWrapper>
        <TitleContainer>
          <StyledTitle>Community @ The Foundry</StyledTitle>
        </TitleContainer>
        <CardGrid>
          {socialArray.map((reference, i) => (
            <SocialContainer key={i}>
              {i === 2 ? (
                <StyledImage
                  className="invertIcon"
                  src={reference.icon.url}
                  alt={reference.icon.alt}
                />
              ) : (
                <StyledImage
                  src={reference.icon.url}
                  alt={reference.icon.alt}
                />
              )}
              <div>
                <div>
                  <RichText
                    render={reference.title}
                    htmlSerializer={sectionSerializer}
                  />
                  <RichText
                    render={reference.text}
                    htmlSerializer={sectionSerializer}
                  />
                </div>
                <StyledLink
                  href={reference.link.url}
                  target="_blank"
                  rel="noopener"
                >
                  <span>Go to website</span>
                  <FormattedIcon name="right-arrow" />
                </StyledLink>
              </div>
            </SocialContainer>
          ))}
        </CardGrid>
      </ElementsWrapper>
    </GridCol>
  );
};

export default SocialSection;

SocialSection.propTypes = {
  data: PropTypes.node.isRequired,
};
