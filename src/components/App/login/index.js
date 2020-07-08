import React from 'react';
import { Link } from 'gatsby';
import LoginForm from './form';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { Container, mixins, theme } from '@styles';

const { fontSizes } = theme;

const MainContainer = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledHeader = styled.h1`
  color: var(--color-text);
  font-size: ${fontSizes.xl};
  margin-bottom: 2rem;
  font-weight: var(--font-weight-bold);
`;
const LinkContainer = styled.div`
  text-align: right;
`;
const StyledLink = styled(Link)`
  ${mixins.inlineLink};
`;

const Login = ({ data }) => {
  return (
    <MainContainer>
      <Container normal>
        <StyledHeader>Log in to the Foundry</StyledHeader>
        <LoginForm />
        <LinkContainer>
          <StyledLink to={ROUTES.SIGNUP}>
            Not a member yet? <b>Sign up now</b>
          </StyledLink>
        </LinkContainer>
      </Container>
    </MainContainer>
  );
};

export default Login;
