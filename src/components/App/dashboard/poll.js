import React from 'react';
import { Link } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { Card, theme, media, mixins } from '@styles';
import { FormattedIcon } from '@components/icons';
import PollIcon from '@images/other/poll.svg';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 4;
  z-index: 1;

  ${media.desktop`grid-column-end: span 6;`};
  ${media.tablet`grid-column-end: span 12;`};
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body' 'footer';
  grid-gap: 0.5rem;
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-area: header;
`;
const HeaderItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
`;
const HeaderText = styled.h3`
  color: var(--color-text);
  margin: 0;
  font-size: ${fontSizes.xl};
`;
const BodyWrapper = styled.div`
  grid-area: body;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 90px;
    align-items: center;
    user-select: none;
    opacity: 0.3;
  }
`;
const BodyTitle = styled.h3`
  color: var(--color-text);
  font-size: ${fontSizes.lg};
  margin: 1rem 0;
  opacity: 0.5;
`;
const BodyText = styled.p`
  ${mixins.normalText};
  opacity: 0.5;
`;
const FooterWrapper = styled.div`
  grid-area: footer;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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

const PollCard = () => {
  return (
    <GridWrapper>
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              <span role="img" aria-label="">
                📈
              </span>{' '}
              Latest poll
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        <BodyWrapper>
          <img src={PollIcon} alt="Polls" className="invertIcon" />
          <BodyTitle>Nothing to see yet.</BodyTitle>
          <BodyText>
            When you vote, the stats of your most recent poll will show up here.
          </BodyText>
        </BodyWrapper>
        <FooterWrapper>
          <FooterButton to={ROUTES.VOTE}>
            See all <FormattedIcon name="right-arrow" />
          </FooterButton>
        </FooterWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default PollCard;
