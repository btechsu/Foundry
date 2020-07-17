import React, { useState } from 'react';
import { isloggedin, ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { theme, media, mixins, Card, Button } from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 3;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr;
  grid-template-areas: 'header' 'body';
  grid-gap: 0.5rem;
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-area: header;
`;
const HeaderItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
`;
const HeaderText = styled.h3`
  color: var(--color-text);
  margin: 0;
  font-size: ${fontSizes.xl};
  text-transform: capitalize;
`;
const ChevronIconWrapper = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  background: none;
  padding: 0;
  border: 0;

  :focus {
    outline: 0;
  }

  svg {
    display: none;
    ${media.desktop`display: block;`};
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color-text);
  }
`;
const BodyWrapper = styled.div`
  grid-area: body;
  ${media.desktop`display: ${(props) =>
    props.showChevron ? 'block' : 'none'};`};
`;
const SubmitButton = styled(Button)`
  ${mixins.primaryButton};
  ${mixins.bigButton};
  width: 100%;
  margin-bottom: 1rem;
`;

const Sort = ({ children }) => {
  const [chevron, setChevron] = useState(false);
  return (
    <GridWrapper>
      {isloggedin() && (
        <SubmitButton to={ROUTES.SUBMIT_CLUB}>Submit a club</SubmitButton>
      )}
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>Sort by</HeaderText>
            <ChevronIconWrapper onClick={() => setChevron(!chevron)}>
              <FormattedIcon name="chevron" />
            </ChevronIconWrapper>
          </HeaderItems>
        </HeaderWrapper>
        <BodyWrapper showChevron={chevron}>{children}</BodyWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default Sort;
