import React, { Component, useContext } from 'react';
import { Link, navigate } from 'gatsby';
import { throttle, ROUTES, config, isloggedin } from '@utils';
import Menu from './menu';

// styles
import styled from 'styled-components';
import { Container, theme, media, mixins, ThemeToggle, Button } from '@styles';

// logic
import { FirebaseContext } from '@Firebase';

const { fontSizes } = theme;

const StyledContainer = styled.header`
  background-color: var(--color-background);
  box-shadow: 0 2px 4px 0 var(--nav-shadow);
  position: sticky;
  z-index: 4;
  top: 0;
`;
const StyledWrapper = styled.div`
  display: flex;
  min-height: 4rem;
  align-items: center;
  padding: 0.65rem 0;
`;
const StyledNav = styled.nav`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
const StyledHamburger = styled.div`
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  display: none;
  z-index: 5;
  ${media.tablet`display: flex;`};
`;
const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 24px;
`;
const StyledHamburgerInner = styled.div`
  background-color: var(--color-text);
  position: absolute;
  width: 20px;
  height: 3px;
  border-radius: 3px;
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${(props) => (props.menuOpen ? `0.12s` : `0s`)};
  transform: rotate(${(props) => (props.menuOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${(props) =>
      props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: var(--color-text);
    position: absolute;
    left: auto;
    right: 0;
    width: 20px;
    height: 3px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${(props) => (props.menuOpen ? `100%` : `120%`)};
    top: ${(props) => (props.menuOpen ? `0` : `-10px`)};
    opacity: ${(props) => (props.menuOpen ? 0 : 1)};
    transition: ${(props) =>
      props.menuOpen
        ? 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s'
        : 'top 0.1s ease-in 0.25s, opacity 0.1s ease-in'};
  }
  &:after {
    width: ${(props) => (props.menuOpen ? `100%` : `80%`)};
    bottom: ${(props) => (props.menuOpen ? `0` : `-10px`)};
    transform: rotate(${(props) => (props.menuOpen ? `-90deg` : `0`)});
    transition: ${(props) =>
      props.menuOpen
        ? 'bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s'
        : 'bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)'};
  }
`;
const SectionLeft = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  height: 100%;
`;
const SectionRight = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  height: 100%;
  justify-content: flex-end;
`;
const LogoWrapper = styled.div`
  display: flex;
  margin: 0;
  padding: 0 2rem 0 0;
  align-items: center;

  a {
    text-decoration: none;
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family);
    color: var(--color-primary);
    font-size: ${fontSizes.xl};
  }
`;
const ListWrapper = styled.ol`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  ${media.tablet`display: none;`};
`;
const ListItem = styled.li`
  margin: 0 0.5rem;
  position: relative;
  list-style: none;
`;
const MobileHideWrapper = styled(ListItem)`
  ${media.tablet`display: none;`};
`;
const StyledButton = styled(Button)`
  ${mixins.primaryButton};
  ${mixins.smallButton};
  min-width: 0;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: var(--font-family-mono);
  color: var(--color-text);
  font-size: ${fontSizes.md};

  :hover {
    color: var(--color-tertiary);
  }
`;
const LogOutButton = styled.button`
  ${mixins.resetButton};
  cursor: pointer;
  text-decoration: none;
  font-family: var(--font-family-mono);
  color: var(--color-text);
  font-size: ${fontSizes.md};

  :hover {
    color: var(--color-tertiary);
  }
`;

const Logout = (props) => {
  const { firebase } = useContext(FirebaseContext);

  function handleLogoutClick() {
    firebase.doSignOut().then(() => navigate('/login'));
  }

  return (
    <LogOutButton {...props} onClick={handleLogoutClick}>
      Log out
    </LogOutButton>
  );
};

class Nav extends Component {
  state = { menuOpen: false };

  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('resize', () => throttle(this.handleResize()));
      window.addEventListener('keydown', (e) => this.handleKeydown(e));
    }, 100);
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

  handleResize = () => {
    if (window.innerWidth > 768 && this.state.menuOpen) {
      this.toggleMenu();
    }
  };

  handleKeydown = (e) => {
    if (!this.state.menuOpen) {
      return;
    }

    if (e.which === 27 || e.key === 'Escape') {
      this.toggleMenu();
    }
  };

  render() {
    const { menuOpen } = this.state;

    return (
      <StyledContainer>
        <Container normal>
          <StyledWrapper>
            <StyledNav>
              <SectionLeft>
                <LogoWrapper>
                  <Link to={ROUTES.LANDING}>Foundry</Link>
                </LogoWrapper>
                <ListWrapper>
                  {config.navLinks &&
                    config.navLinks.map(({ url, name }, i) => (
                      <ListItem key={i}>
                        <StyledLink to={url}>{name}</StyledLink>
                      </ListItem>
                    ))}
                </ListWrapper>
              </SectionLeft>
              <SectionRight>
                {!isloggedin() && (
                  <>
                    <ListItem>
                      <StyledLink to={ROUTES.LOGIN}>Log in</StyledLink>
                    </ListItem>
                    <MobileHideWrapper>
                      <StyledButton to={ROUTES.SIGNUP}>Sign up</StyledButton>
                    </MobileHideWrapper>
                  </>
                )}
                {isloggedin() && (
                  <ListItem>
                    <Logout />
                  </ListItem>
                )}
                <StyledHamburger onClick={this.toggleMenu}>
                  <StyledHamburgerBox>
                    <StyledHamburgerInner menuOpen={menuOpen} />
                  </StyledHamburgerBox>
                </StyledHamburger>
                <MobileHideWrapper>
                  <ThemeToggle />
                </MobileHideWrapper>
              </SectionRight>
            </StyledNav>
            <Menu menuOpen={menuOpen} toggleMenu={this.toggleMenu} />
          </StyledWrapper>
        </Container>
      </StyledContainer>
    );
  }
}

export default Nav;
