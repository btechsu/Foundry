import React from 'react';

// styles
import styled from 'styled-components';
import { mixins, Card, GridCol } from '@styles';

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
    <GridCol spans={8}>
      <StyledCard>
        <BodyWrapper>
          <BodyText>Coming soon</BodyText>
        </BodyWrapper>
      </StyledCard>
    </GridCol>
  );
};

export default Main;
