import React from 'react';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { Container, Button, mixins, media } from '@styles';

const SectionWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1600px;
  min-height: calc(100vh - 5rem);
  padding-top: 0;
  padding-bottom: 0;
  ${media.desktop`
    padding-top: 0;
    padding-bottom: 0;
  `};
  ${media.tablet`
    padding-top: 0;
    padding-bottom: 0;
  `};
  ${media.phablet`
    padding-top: 0;
    padding-bottom: 0;
  `};
`;
const StyledTitle = styled.h1`
  color: var(--color-primary);
  font-size: 12vw;
  line-height: 1;
  ${media.bigDesktop`font-size: 200px;`}
  ${media.phablet`font-size: 120px;`};
`;
const StyledSubtitle = styled.h2`
  color: var(--color-gray-600);
  font-size: 3vw;
  font-weight: 400;
  ${media.bigDesktop`font-size: 50px;`};
  ${media.phablet`font-size: 30px;`};
`;
const StyledButton = styled(Button)`
  ${mixins.primaryButton};
  ${mixins.bigButton};
  margin: 3rem 0;
`;

export default () => (
  <SectionWrapper>
    <Container normal>
      <StyledTitle>404</StyledTitle>
      <StyledSubtitle>
        The elevator kittens are not happy about this.
      </StyledSubtitle>
      <StyledSubtitle>Take the stairs and get out of here.</StyledSubtitle>
      <StyledButton to={ROUTES.LANDING}>Go home</StyledButton>
    </Container>
  </SectionWrapper>
);
