import React from 'react';
import PropTypes from 'prop-types';

// styles
import styled from 'styled-components';
import theme from './theme';

const { fontSizes } = theme;

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 4;
  outline: 0;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  display: block;
  user-select: none;
`;
const DropDownWrapper = styled.div`
  position: absolute;
  top: -4rem;
  left: -12rem;
  height: auto;
  width: 150px;
  padding: 1rem;
  display: flex;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  background-color: var(--color-background);
  border: transparent;
  border-radius: 1rem;
  box-shadow: 0 5px 9px var(--shadow);
  user-select: none;
  z-index: 5;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledText = styled.h4`
  font-size: ${fontSizes.lg};
  color: var(--color-text);
`;

const DropDown = ({ open, title, toggleMenu, children, props }) => {
  const handleMenuClick = (e) => {
    const target = e.target;
    const isLink = target.hasAttribute('href');
    const isNotMenu =
      target.classList[0] && target.classList[0].includes('StyledContainer');

    if (isLink || isNotMenu) {
      toggleMenu();
    }
  };

  return (
    <>
      <StyledContainer onClick={handleMenuClick} isOpen={open} />
      <DropDownWrapper isOpen={open} {...props}>
        <ContentWrapper>
          {title && <StyledText>{title}</StyledText>}
          {children}
        </ContentWrapper>
      </DropDownWrapper>
    </>
  );
};

export default DropDown;

DropDown.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
};
