import React, { useState } from 'react';

// styles
import styled from 'styled-components';
import { Card, theme } from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

const ModalWrapper = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.3s linear;
`;
const ModalContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 3rem) 1fr;
  grid-template-areas: 'header' 'body';
  grid-gap: 0.5rem;
  margin: 0 15px;
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
`;
const IconWrapper = styled.button`
  position: relative;
  display: flex;
  width: 1rem;
  height: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 2rem;

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

const Modal = ({ open, header, children }) => {
  const [modalOpen, setModalOpen] = useState(open);

  return (
    <>
      <ModalWrapper show={modalOpen}>
        <ModalContent>
          <StyledCard>
            <HeaderWrapper>
              <HeaderItems>
                <HeaderText>{header}</HeaderText>
                <IconWrapper onClick={() => setModalOpen(false)}>
                  <FormattedIcon name="cancel" />
                </IconWrapper>
              </HeaderItems>
            </HeaderWrapper>
            <BodyWrapper>{children}</BodyWrapper>
          </StyledCard>
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default Modal;
