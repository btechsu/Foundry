import React from 'react';

// styles
import styled from 'styled-components';
import { theme, media } from '@styles';
import SearchImage from '@images/other/search.svg';

const { fontSizes } = theme;

const Wrapper = styled.div`
  width: 100%;
  height: 25rem;
  background-color: var(--color-muted-background);
  z-index: 0;
  margin-top: 2rem;
  border-radius: 3rem;
  display: flex;
  ${media.tablet`height: 19rem;`};

  .ais-SearchBox-resetIcon {
    color: var(--color-text);
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  ${media.desktop`padding: 1rem;`};
  ${media.tablet`align-items: center; text-align: center; margin-top: 1.5rem;`};
`;
const ColoredSpan = styled.span`
  color: var(--color-primary);
  display: inline;
  word-wrap: break-word;
`;
const HeaderText = styled.h1`
  color: var(--color-text);
  font-size: ${fontSizes.h2};
  ${media.desktop`font-size: ${fontSizes.xxl};`};
`;
const SubTitle = styled.h3`
  color: var(--color-gray-700);
  font-size: ${fontSizes.xl};
  ${media.desktop`font-size: ${fontSizes.lg};`};
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const LeftCol = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 769px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
const RightCol = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  ${media.tablet`margin-top: 1.5rem;`};

  img {
    width: 70%;
    user-select: none;
    ${media.tablet`display: none;`};
  }

  @media (min-width: 769px) {
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
`;
const SearchWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Hero = ({ children }) => {
  return (
    <Wrapper>
      <Row>
        <LeftCol>
          <ContentWrapper>
            <HeaderText>
              Lets find a club <ColoredSpan>for you</ColoredSpan>.
            </HeaderText>
            <SubTitle>Search through our directory.</SubTitle>
            <SearchWrapper>{children}</SearchWrapper>
          </ContentWrapper>
        </LeftCol>
        <RightCol>
          <img src={SearchImage} alt="Search through our clubs directory" />
        </RightCol>
      </Row>
    </Wrapper>
  );
};

export default Hero;
