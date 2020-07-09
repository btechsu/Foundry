import React, { useContext, createRef } from 'react';
import { navigate } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { mixins, FormGroup, Container, theme, ClickableButton } from '@styles';
import NProgress from 'nprogress';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { FirebaseContext } from '@Firebase';

const { fontSizes } = theme;

const MainContainer = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
`;
const StyledHeader = styled.h1`
  color: var(--color-text);
  font-size: ${fontSizes.xxl};
  font-weight: var(--font-weight-bold);
  margin-bottom: 2rem;
  text-align: center;
`;
const PasswordFormContainer = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;
const FormContainer = styled.div`
  max-width: 96vw;
  width: 22rem;
`;
const RegistrationContainer = styled.div`
  max-width: 22rem;
`;
const FormButton = styled(ClickableButton)`
  ${mixins.primaryButton};
  ${mixins.bigButton};
  width: 100%;
  margin: 1rem 0;

  :disabled {
    cursor: default;
  }
`;
const FormError = styled.span`
  color: var(--color-error);
  display: inline-block;
  margin-top: 1rem;
`;

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address'),
});

export default () => {
  const { firebase } = useContext(FirebaseContext) || {};
  const recaptchaRef = createRef();
  if (!firebase) return null;

  return (
    <MainContainer>
      <Container normal>
        <StyledHeader>Forgot your password?</StyledHeader>
        <PasswordFormContainer>
          <FormContainer>
            <RegistrationContainer>
              <Formik
                initialValues={{
                  email: undefined,
                }}
                validationSchema={FormSchema}
                onSubmit={(values, { setSubmitting, setStatus }) => {
                  function resetPassword() {
                    setSubmitting(true);
                    NProgress.start();
                    firebase
                      .doSendPasswordResetEmail({ email: values.email })
                      .then(() => {
                        navigate(ROUTES.SENT_PASSWORD);
                        setSubmitting(false);
                        NProgress.done(true);
                      })
                      .catch((err) => {
                        setStatus(
                          err.message ||
                            'An unknown error occured. Try refreshing the page.'
                        );
                        setSubmitting(false);
                        NProgress.done(true);
                      });
                  }

                  if (recaptchaRef.current.getValue() === undefined) {
                    recaptchaRef.current.executeAsync().then(() => {
                      return resetPassword();
                    });
                  } else {
                    return resetPassword();
                  }
                }}
              >
                {({ isSubmitting, dirty, status, submitCount }) => (
                  <Form>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        autoComplete="username"
                      />
                      <ErrorMessage component="span" name="email" />
                    </FormGroup>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      name="recatchpa"
                      size="invisible"
                      sitekey="6LdXUK8ZAAAAAIU3_JDUGHuI4DL5nsqbEVtIUsgU"
                    />
                    {!!status && <FormError>{status}</FormError>}
                    <FormButton
                      disabled={!dirty || isSubmitting || submitCount >= 5}
                      type="submit"
                    >
                      Reset password
                    </FormButton>
                  </Form>
                )}
              </Formik>
            </RegistrationContainer>
          </FormContainer>
        </PasswordFormContainer>
      </Container>
    </MainContainer>
  );
};
