import React from 'react';

// styles
import styled from 'styled-components';
import { theme, media, mixins, Container, Card } from '@styles';

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 6;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
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
  text-transform: capitalize;
`;
const HeaderClubType = styled.span`
  color: var(--color-always-white);
  font-size: ${fontSizes.xs};
  font-weight: inherit;
  text-transform: uppercase;
  background-color: var(--color-primary-shaded);
  padding: 0 0.5rem;
`;
const BodyWrapper = styled.div`
  grid-area: body;
`;
const BodyIcons = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 5rem 1fr;
`;
const BodyIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    height: 1.7rem;
    width: 1.7rem;
    margin-right: 0.2rem;
    color: var(--color-gray-700);
  }

  .smaller {
    height: 1.4rem;
    width: 1.4rem;
  }
`;
const BodySmallText = styled.p`
  color: var(--color-gray-700);
  font-size: ${fontSizes.md};
  margin: 0;
  text-transform: capitalize;
`;
const BodyText = styled.p`
  ${mixins.normalText};
`;

const Side = () => {
  return (
    <GridWrapper>
      <StyledCard></StyledCard>
    </GridWrapper>
  );
};

export default Side;
