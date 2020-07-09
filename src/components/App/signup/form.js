import React, { useContext, createRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { FormGroup, ClickableButton, mixins } from '@styles';
import serializeHyperlink from '@components/serializeHyperlink';
import { RichText } from 'prismic-reactjs';
import NProgress from 'nprogress';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { FirebaseContext } from '@Firebase';

const SignUpFormContainer = styled.div`
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
  margin-bottom: 1rem;

  :disabled {
    cursor: default;
  }
`;
const FormError = styled.span`
  color: var(--color-error);
  display: inline-block;
  margin-bottom: 1rem;
`;

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email field is required')
    .email('Please enter a valid email address')
    .matches(
      /^[A-Za-z0-9._%+-]+@bths.edu$/,
      'Please use your Brooklyn Tech email'
    ),
  password: Yup.string()
    .required('Password field is required')
    .max(100)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain 8 characters, at least one lower case letter, upper case letter, and number'
    ),
});

const SignupForm = ({ tos }) => {
  const { firebase } = useContext(FirebaseContext) || {};
  const recaptchaRef = createRef();
  if (!firebase) return null;

  return (
    <SignUpFormContainer>
      <FormContainer>
        <RegistrationContainer>
          <Formik
            initialValues={{
              email: undefined,
              password: undefined,
            }}
            validationSchema={FormSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              recaptchaRef.current.execute();
              function signup() {
                setSubmitting(true);
                NProgress.start();

                firebase
                  .doCreateUserWithEmailAndPassword({
                    email: values.email,
                    password: values.password,
                  })
                  .then(() => {
                    navigate(ROUTES.DASHBOARD);
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
                  return signup();
                });
              } else {
                return signup();
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
                    Sign up
                  </FormButton>
                  <RichText
                    render={tos}
                    serializeHyperlink={serializeHyperlink}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </RegistrationContainer>
      </FormContainer>
    </SignUpFormContainer>
  );
};

export default SignupForm;

SignupForm.propTypes = {
  tos: PropTypes.array.isRequired,
};
