import React from 'react';
import { getuser } from '@utils';

// styles
import styled from 'styled-components';
import { theme, Container, media } from '@styles';

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
  ${media.thone`font-size: 8.5vw;`};
`;
const SubTitle = styled.h3`
  color: var(--color-gray-700);
  font-size: ${fontSizes.xl};
  ${media.thone`font-size: 5vw;`};
`;

const Hero = ({ subtitle }) => {
  const currentUser = getuser();

  return (
    <Wrapper>
      <Container normal>
        <ContentWrapper>
          <HeaderText>
            Hello{' '}
            <ColoredSpan>{currentUser ? currentUser.email : ''}</ColoredSpan>,
          </HeaderText>
          <SubTitle>{subtitle}</SubTitle>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};

export default Hero;
