import React, { useContext, useState } from 'react';
import { getuser } from '@utils';

// styles
import styled from 'styled-components';
import { theme, media, mixins, Container } from '@styles';

// logic
import { FirebaseContext } from '@Firebase';

const { fontSizes } = theme;

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) =>
    props.success
      ? 'var(--color-success-background)'
      : 'var(--color-error-background)'};
  color: ${(props) =>
    props.success ? 'var(--color-success)' : 'var(--color-error)'};
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.5rem 0;
`;
const StyledTitle = styled.h2`
  font-size: ${fontSizes.lg};
  font-weight: var(--font-weight-normal);
  ${media.tablet`font-size: ${fontSizes.lg};`};
`;
const StyledButton = styled.button`
  color: var(--color-tertiary);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: 0;
  }
`;

const Banner = () => {
  const currentUser = getuser();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  // check if there is a user record in the localstorage
  if (currentUser) {
    if (!currentUser.emailVerified)
      return (
        <Wrapper success={success}>
          <Container normal>
            <ContentWrapper>
              {!success && !error && (
                <StyledTitle>
                  <strong>Uh-oh!</strong> Looks like your email isn't verified!
                  Click{' '}
                  <StyledButton
                    onClick={() => {
                      firebase
                        .doSendVerificationEmail()
                        .then(() => {
                          setSuccess(true);
                        })
                        .catch((err) => {
                          setError(
                            err.message
                              ? err.message
                              : 'An unknown error has occurred. Try refreshing the page or re-logging.'
                          );
                        });
                    }}
                  >
                    here
                  </StyledButton>{' '}
                  to recieve an email with your verificaion link.
                </StyledTitle>
              )}
              {success && (
                <StyledTitle success={success}>
                  <strong>Check your inbox.</strong> We sent a verificaion link
                  to your Brooklyn Tech email. The link is valid for the next 2
                  hours.
                </StyledTitle>
              )}
              {error && <StyledTitle success={success}>{error}</StyledTitle>}
            </ContentWrapper>
          </Container>
        </Wrapper>
      );
  }

  return null;
};

export default Banner;
