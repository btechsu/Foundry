import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styles
import styled from 'styled-components';
import { Card, theme } from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

const ModalWrapper = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
  z-index: 6;
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-areas: 'header' 'body';
  max-width: 500px;
  margin: 15px;
  z-index: 9999;
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-area: header;
`;
const HeaderItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  grid-gap: 1rem;
`;
const HeaderText = styled.h3`
  color: var(--color-text);
  margin: 0;
  font-size: ${fontSizes.xl};
`;
const IconWrapper = styled.button`
  position: relative;
  display: flex;
  width: 1rem;
  height: 1rem;
  background: none;
  border: none;
  cursor: pointer;

  :focus {
    outline: 0;
  }

  svg {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color-text);
  }
`;
const BodyWrapper = styled.div`
  grid-area: body;
`;

class Modal extends Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  handleMenuClick = (e) => {
    const target = e.target;
    const isNotMenu =
      target.classList && target.classList[0].includes('ModalWrapper');
    if (isNotMenu) {
      this.onClose();
    }
  };

  render() {
    if (!this.props.open) {
      return null;
    }

    return (
      <ModalWrapper onClick={this.handleMenuClick}>
        <StyledCard nopadding>
          <HeaderWrapper>
            <HeaderItems>
              <HeaderText>{this.props.header}</HeaderText>
              <IconWrapper onClick={this.onClose}>
                <FormattedIcon name="cancel" />
              </IconWrapper>
            </HeaderItems>
          </HeaderWrapper>
          <BodyWrapper>{this.props.children}</BodyWrapper>
        </StyledCard>
      </ModalWrapper>
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  header: PropTypes.string,
};
