import React from 'react';

// styles
import styled from 'styled-components';
import { mixins, theme, Container } from '@styles';

const { fontSizes } = theme;

const ContentContainer = styled.div`
  margin: 3rem auto 5rem;
  max-width: 50rem;
  text-align: center;
`;
const StyledHeading = styled.h1`
  font-size: ${fontSizes.h2};
  margin-bottom: 1.5rem;
  line-height: 1.25;
  color: var(--color-text);
`;
const StyledText = styled.p`
  ${mixins.regularText};
`;

export default () => {
  return (
    <ContentContainer>
      <Container normal>
        <StyledHeading>Password reset sent</StyledHeading>
        <StyledText>
          We just sent a message to the email you provided with a link to reset
          your password. Please check your inbox and follow the instructions in
          the email.
        </StyledText>
      </Container>
    </ContentContainer>
  );
};
