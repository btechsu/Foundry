import React from 'react';

// styles
import styled from 'styled-components';
import { media, mixins, Card } from '@styles';

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 8;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, max-content);
  grid-template-areas: 'body';
  grid-gap: 0.5rem;
`;
const BodyWrapper = styled.div`
  grid-area: body;
`;
const BodyText = styled.p`
  ${mixins.normalText};
  margin: 0;
`;

const Main = () => {
  return (
    <GridWrapper>
      <StyledCard>
        <BodyWrapper>
          <BodyText>Coming soon</BodyText>
        </BodyWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default Main;
