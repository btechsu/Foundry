import React, { Component } from 'react';
import { ROUTES, emailVerified } from '@utils';

// styles
import styled from 'styled-components';
import { theme, media, mixins, Card, Button, GridCol } from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

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
const ModileHeaderItems = styled.button`
  background: none;
  border: 0;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  text-align: inherit;
  padding: 0;
  cursor: pointer;

  :focus {
    outline: 0;
  }
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

class Sort extends Component {
  state = { chevron: false };

  changeChevronToggle = () => {
    if (window.innerWidth < 768) {
      return true;
    }

    return false;
  };

  render() {
    return (
      <GridCol spans={3}>
        {emailVerified() && (
          <SubmitButton to={ROUTES.SUBMIT_CLUB}>Submit a club</SubmitButton>
        )}
        <StyledCard>
          <HeaderWrapper>
            {this.changeChevronToggle && (
              <ModileHeaderItems
                onClick={() => this.setState({ chevron: !this.state.chevron })}
              >
                <HeaderText>Sort by</HeaderText>
                <ChevronIconWrapper>
                  <FormattedIcon name="chevron" />
                </ChevronIconWrapper>
              </ModileHeaderItems>
            )}
            {!this.changeChevronToggle && (
              <HeaderItems>
                <HeaderText>Sort by</HeaderText>
              </HeaderItems>
            )}
          </HeaderWrapper>
          <BodyWrapper showChevron={this.state.chevron}>
            {this.props.children}
          </BodyWrapper>
        </StyledCard>
      </GridCol>
    );
  }
}

export default Sort;
