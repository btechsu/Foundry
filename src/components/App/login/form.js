import React, { useContext, createRef } from 'react';
import { Link, navigate } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { FormGroup, ClickableButton, mixins } from '@styles';
import NProgress from 'nprogress';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { FirebaseContext } from '@Firebase';

const LoginFormContainer = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
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
const StyledLink = styled(Link)`
  ${mixins.inlineLink};
`;
const ForgotContainer = styled.div`
  position: relative;
  width: 100%;
`;
const FormError = styled.span`
  color: var(--color-error);
  display: inline-block;
  margin-top: 1rem;
`;

const FormSchema = Yup.object().shape({
  email: Yup.string().required('Email field is required'),
  password: Yup.string().required('Password field is required'),
});

const LoginForm = () => {
  const { firebase } = useContext(FirebaseContext) || {};
  const recaptchaRef = createRef();
  if (!firebase) return null;

  return (
    <LoginFormContainer>
      <FormContainer>
        <RegistrationContainer>
          <Formik
            initialValues={{
              email: undefined,
              password: undefined,
            }}
            validationSchema={FormSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              function login() {
                setSubmitting(true);
                NProgress.start();
                firebase
                  .verifyCaptchaToken({
                    token: recaptchaRef.current.getValue(),
                  })
                  .then(() => {
                    return firebase.doSignInWithEmailAndPassword({
                      email: values.email,
                      password: values.password,
                    });
                  })
                  .then(() => {
                    navigate(ROUTES.DASHBOARD);
                    setSubmitting(false);
                    NProgress.done(true);
                  })
                  .catch((err) => {
                    if (
                      err.code === 'auth/user-not-found' ||
                      err.code === 'auth/wrong-password'
                    ) {
                      setStatus(
                        'Invalid username or password. Please check your credentials.'
                      );
                    } else {
                      setStatus(
                        err.message ||
                          'An unknown error occured. Try refreshing the page.'
                      );
                    }
                    setSubmitting(false);
                    NProgress.done(true);
                  });
              }

              if (recaptchaRef.current.getValue() === '') {
                recaptchaRef.current
                  .executeAsync()
                  .then(() => {
                    login();
                  })
                  .catch((err) => {
                    setStatus(err);
                    setSubmitting(false);
                  });
              } else {
                login();
              }
            }}
          >
            {({ isSubmitting, dirty, submitCount, status }) => (
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
                <FormGroup>
                  {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                  <ErrorMessage component="span" name="password" />
                </FormGroup>
                <div>
                  <ForgotContainer>
                    <StyledLink to={ROUTES.FORGOT_PASSWORD}>
                      I forgot my password
                    </StyledLink>
                  </ForgotContainer>
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
                    Login
                  </FormButton>
                </div>
              </Form>
            )}
          </Formik>
        </RegistrationContainer>
      </FormContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;
