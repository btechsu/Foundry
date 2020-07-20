import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql, Link } from 'gatsby';

// styles
import styled from 'styled-components';
import { mixins, theme, ClickableCard, GridCol } from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

const CustomCol = styled(GridCol)`
  margin-top: 4rem;
`;
const Elements = styled.section`
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: auto auto;
  grid-auto-rows: max-content auto;
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
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2rem;

  @media only screen and (min-width: 64rem) {
    grid-template-columns: repeat(3, minmax(18rem, 1fr));
  }
`;
const StyledCard = styled(ClickableCard)`
  display: grid;
  grid-template-rows: minmax(0, 13rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body' 'footer';
  grid-gap: 0.5rem;
`;
const HeaderWrapper = styled.div`
  grid-area: header;
`;
const StyledImage = styled(Img)`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const BodyWrapper = styled.div`
  grid-area: body;
  padding: 1rem 1rem 0 1rem;
`;
const BodyTitle = styled.h4`
  color: var(--color-text);
  font-size: ${fontSizes.lg};
`;
const BodyExcept = styled.p`
  font-size: ${fontSizes.md};
  color: var(--color-gray-700);
  margin-bottom: 0;
`;
const FooterWrapper = styled.div`
  grid-area: footer;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0 1rem 1rem 1rem;
`;
const FooterButton = styled(Link)`
  ${mixins.inlineLink}

  svg {
    overflow: hidden;
    position: relative;
    top: 0.425rem;
    fill: currentcolor;
    height: 24;
    width: 24;
  }
`;

const NewsSection = () => {
  const data = useStaticQuery(graphql`
    query {
      filler1: file(relativePath: { eq: "other/filler.jpg" }) {
        childImageSharp {
          fluid(fit: CONTAIN, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      filler2: file(relativePath: { eq: "other/filler2.jpg" }) {
        childImageSharp {
          fluid(fit: CONTAIN, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      filler3: file(relativePath: { eq: "other/filler3.jpg" }) {
        childImageSharp {
          fluid(fit: CONTAIN, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <CustomCol spans={12}>
      <Elements>
        <TitleContainer>
          <StyledTitle>Recent tech news</StyledTitle>
        </TitleContainer>
      </Elements>
      <CardGrid>
        <StyledCard noPadding to="/">
          <HeaderWrapper>
            <StyledImage
              fluid={data.filler1.childImageSharp.fluid}
              alt="filler image"
            />
          </HeaderWrapper>
          <BodyWrapper>
            <BodyTitle>
              Amazing! Brooklyn tech fixes their elevators for the first time in
              100 years!
            </BodyTitle>
            <BodyExcept>
              Brooklyn Tech students reported that they're finally happy to see
              that Brooklyn Tech is doing someething for the students.
            </BodyExcept>
          </BodyWrapper>
          <FooterWrapper>
            <FooterButton to="/">
              Keep reading <FormattedIcon name="right-arrow" />
            </FooterButton>
          </FooterWrapper>
        </StyledCard>
        <StyledCard noPadding to="/">
          <HeaderWrapper>
            <StyledImage
              fluid={data.filler2.childImageSharp.fluid}
              alt="filler image"
            />
          </HeaderWrapper>
          <BodyWrapper>
            <BodyTitle>
              Braking news: David newman is running in the 2020 election!
            </BodyTitle>
            <BodyExcept>
              In a recent study, it was confirmed that all poeple would rather
              vote for Mr. Newman rather than Kanye West. America is in good
              hands.
            </BodyExcept>
          </BodyWrapper>
          <FooterWrapper>
            <FooterButton to="/">
              Keep reading <FormattedIcon name="right-arrow" />
            </FooterButton>
          </FooterWrapper>
        </StyledCard>
        <StyledCard noPadding to="/">
          <HeaderWrapper>
            <StyledImage
              fluid={data.filler3.childImageSharp.fluid}
              alt="filler image"
            />
          </HeaderWrapper>
          <BodyWrapper>
            <BodyTitle>
              Trump 'furious' about 'underwhelming' crowd at Tulsa rally
            </BodyTitle>
            <BodyExcept>
              "Almost 1 million tickets sold" but only 30 reported people showed
              up (most from media). Trump says "Sorry losers and haters, but my
              I.Q. is still higher!"
            </BodyExcept>
          </BodyWrapper>
          <FooterWrapper>
            <FooterButton to="/">
              Keep reading <FormattedIcon name="right-arrow" />
            </FooterButton>
          </FooterWrapper>
        </StyledCard>
        <StyledCard noPadding to="/">
          <HeaderWrapper>
            <StyledImage
              fluid={data.filler1.childImageSharp.fluid}
              alt="filler image"
            />
          </HeaderWrapper>
          <BodyWrapper>
            <BodyTitle>
              Amazing! Brooklyn tech fixes their elevators for the first time in
              100 years!
            </BodyTitle>
            <BodyExcept>
              Brooklyn Tech students reported that they're finally happy to see
              that Brooklyn Tech is doing someething for the students.
            </BodyExcept>
          </BodyWrapper>
          <FooterWrapper>
            <FooterButton to="/">
              Keep reading <FormattedIcon name="right-arrow" />
            </FooterButton>
          </FooterWrapper>
        </StyledCard>
        <StyledCard noPadding to="/">
          <HeaderWrapper>
            <StyledImage
              fluid={data.filler3.childImageSharp.fluid}
              alt="filler image"
            />
          </HeaderWrapper>
          <BodyWrapper>
            <BodyTitle>
              Trump 'furious' about 'underwhelming' crowd at Tulsa rally
            </BodyTitle>
            <BodyExcept>
              "Almost 1 million tickets sold" but only 30 reported people showed
              up (most from media). Trump says "Sorry losers and haters, but my
              I.Q. is still higher!"
            </BodyExcept>
          </BodyWrapper>
          <FooterWrapper>
            <FooterButton to="/">
              Keep reading <FormattedIcon name="right-arrow" />
            </FooterButton>
          </FooterWrapper>
        </StyledCard>
        <StyledCard noPadding to="/">
          <HeaderWrapper>
            <StyledImage
              fluid={data.filler2.childImageSharp.fluid}
              alt="filler image"
            />
          </HeaderWrapper>
          <BodyWrapper>
            <BodyTitle>
              Braking news: David newman is running in the 2020 election!
            </BodyTitle>
            <BodyExcept>
              In a recent study, it was confirmed that all poeple would rather
              vote for Mr. Newman rather than Kanye West. America is in good
              hands.
            </BodyExcept>
          </BodyWrapper>
          <FooterWrapper>
            <FooterButton to="/">
              Keep reading <FormattedIcon name="right-arrow" />
            </FooterButton>
          </FooterWrapper>
        </StyledCard>
      </CardGrid>
    </CustomCol>
  );
};

export default NewsSection;
