import React from 'react';

// styles
import styled from 'styled-components';
import { theme, Card, GridCol } from '@styles';

const { fontSizes } = theme;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 3rem) auto 1fr;
  grid-template-areas: 'header' 'search' 'body';
  grid-gap: 1rem;
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

const CardWrapper = ({ children }) => {
  return (
    <GridCol spans={12}>
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              <span role="img" aria-label="">
                👥
              </span>{' '}
              Manage Users
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        {children}
      </StyledCard>
    </GridCol>
  );
};

export default CardWrapper;
