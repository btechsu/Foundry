import React from 'react';
import PropTypes from 'prop-types';

// styles
import { Container, theme, media } from '@styles';
import styled from 'styled-components';

const { fontSizes } = theme;

const HeroWrapper = styled.div`
  position: relative;
  background-color: var(--color-muted);
  margin-bottom: ${(props) => (props.mb ? props.mb : '5rem')};
  ${media.tablet`margin-bottom: 3rem;`};
`;
const ContentWrapper = styled.div`
  padding-top: 48px;
  padding-bottom: 36px;

  h3 {
    font-size: ${fontSizes.lg};
    ${media.tablet`font-size: ${fontSizes.md};`};
    font-weight: var(--font-weight-normal);
    color: var(--color-gray-700);
  }

  h1 {
    font-size: ${fontSizes.h2};
    ${media.tablet`font-size: ${fontSizes.xxl};`};
    color: var(--color-text);
  }
`;

const Hero = ({ title, subtitle, mb }) => {
  return (
    <HeroWrapper mb={mb}>
      <Container normal>
        <ContentWrapper>
          <h3>{subtitle}</h3>
          <h1>{title}</h1>
        </ContentWrapper>
      </Container>
    </HeroWrapper>
  );
};

export default Hero;

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
