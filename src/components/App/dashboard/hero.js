import React, { useContext } from 'react';

// styles
import styled from 'styled-components';
import { theme, Container, media } from '@styles';

// logic
import { FirebaseContext } from '@components/Firebase';

const { fontSizes } = theme;

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
  background-color: var(--color-muted-background);
  z-index: 0;
`;
const ContentWrapper = styled.div`
  padding-top: 4rem;
  ${media.tablet`padding-top: 3rem;`};
`;
const ColoredSpan = styled.span`
  color: var(--color-primary);
  display: inline;
  word-wrap: break-word;
`;
const HeaderText = styled.h1`
  color: var(--color-text);
  font-size: ${fontSizes.h2};
  ${media.thone`font-size: 9vw;`};
`;
const SubTitle = styled.h3`
  color: var(--color-text);
  font-size: ${fontSizes.xl};
  ${media.thone`font-size: 5vw;`};
`;

const Hero = () => {
  const { user } = useContext(FirebaseContext) || {};

  return (
    <Wrapper>
      <Container normal>
        <ContentWrapper>
          <HeaderText>
            Hello <ColoredSpan>{!user ? 'Loading...' : user.email}</ColoredSpan>,
          </HeaderText>
          <SubTitle>Here's your daily briefing</SubTitle>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};

export default Hero;
