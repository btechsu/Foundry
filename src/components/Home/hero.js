import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Elements } from 'prismic-reactjs';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { Container, Section, Button, mixins, theme, media } from '@styles';

const { fontSizes } = theme;

const HeroWrapper = styled.div`
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
const LeftCol = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 768px) {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightCol = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  ${media.tablet`margin-top: 1.5rem;`};
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
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 1.25rem;
`;
const MutedButton = styled(Button)`
  ${mixins.secondaryButton};
  ${mixins.smallButton};
  ${media.phablet`min-width: 0;`};
`;
const MainButton = styled(Button)`
  ${mixins.primaryButton};
  ${mixins.smallButton};
  margin-left: 1rem;
  ${media.phablet`min-width: 0;`};
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
    default:
      return null;
  }
};

const Hero = ({ data }) => {
  const heroArray = data.hero[0];

  return (
    <Section hero>
      <Container normal>
        <HeroWrapper>
          <LeftCol>
            <ContentWrapper>
              <StyledLabel>{heroArray.label}</StyledLabel>
              <RichText
                render={heroArray.title}
                htmlSerializer={sectionSerializer}
              />
              <RichText
                render={heroArray.description}
                htmlSerializer={sectionSerializer}
              />
              <ButtonWrapper>
                <MutedButton to={ROUTES.ABOUT}>Learn more</MutedButton>
                <MainButton to={ROUTES.SIGNUP}>Sign up</MainButton>
              </ButtonWrapper>
            </ContentWrapper>
          </LeftCol>
          <RightCol>
            <img src={heroArray.image.url} alt={heroArray.image.alt} />
          </RightCol>
        </HeroWrapper>
      </Container>
    </Section>
  );
};

export default Hero;

Hero.propTypes = {
  data: PropTypes.array.isRequired,
};
