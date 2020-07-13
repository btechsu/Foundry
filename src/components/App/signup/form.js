import React, { useContext, createRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { FormGroup, ClickableButton, mixins, theme } from '@styles';
import serializeHyperlink from '@components/serializeHyperlink';
import { RichText } from 'prismic-reactjs';
import NProgress from 'nprogress';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { FirebaseContext } from '@Firebase';

const { fontSizes } = theme;

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
const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.6rem;
  margin-bottom: 1rem;
`;
const RadioButtonWrapper = styled.div`
  label {
    margin: 0;
    cursor: pointer;
    position: relative;
    padding: 7px 15px;
    color: var(--color-text);
    border: 3px solid var(--color-primary);
    border-radius: 1rem;
    z-index: 0;
  }

  input {
    cursor: pointer;
    width: 0;
  }

  input:checked ~ label {
    color: var(--color-always-white);
    background-color: var(--color-primary);
  }
`;
const RadioForm = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-family: var(--font-family);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    font-size: ${fontSizes.md};
    display: inline-block;
    margin-bottom: 0;
    line-height: 1.25rem;
  }

  span {
    color: var(--color-error);
    font-weight: var(--font-weight-normal);
  }
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
  year: Yup.string().required('Please choose a year'),
});

function getFirstYear() {
  const d = new Date();
  const thisMonth = d.getMonth();
  const thisYear = d.getFullYear();
  if (thisMonth >= 6) {
    return thisYear + 1;
  } else {
    return thisYear;
  }
}

const SignupForm = ({ tos }) => {
  const { firebase } = useContext(FirebaseContext) || {};
  const recaptchaRef = createRef();
  if (!firebase) return null;

  const years = [
    getFirstYear(),
    getFirstYear() + 1,
    getFirstYear() + 2,
    getFirstYear() + 3,
  ];

  return (
    <SignUpFormContainer>
      <FormContainer>
        <RegistrationContainer>
          <Formik
            initialValues={{
              email: undefined,
              password: undefined,
              year: undefined,
            }}
            validationSchema={FormSchema}
            onSubmit={(values, { setSubmitting, setStatus }) => {
              function signup() {
                setSubmitting(true);
                NProgress.start();

                firebase
                  .createNewAccount({
                    email: values.email,
                    password: values.password,
                    year: values.year,
                  })
                  .then(() => {
                    return firebase.doSignInWithEmailAndPassword({
                      email: values.email,
                      password: values.password,
                    });
                  })
                  .then(() => {
                    setSubmitting(false);
                    NProgress.done(true);
                    navigate(ROUTES.DASHBOARD);
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

              if (recaptchaRef.current.getValue() === '') {
                recaptchaRef.current
                  .executeAsync()
                  .then(() => {
                    return firebase
                      .verifyCaptchaToken({
                        token: recaptchaRef.current.getValue(),
                      })
                      .then(() => signup());
                  })
                  .catch((err) => {
                    setStatus(err);
                    setSubmitting(false);
                  });
              } else {
                signup();
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
                <RadioForm>
                  {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                  <label htmlFor="year">Graduating year</label>
                  <ErrorMessage component="span" name="year" />
                  <RadioGroup>
                    {years.map((year, i) => (
                      <RadioButtonWrapper key={i}>
                        <Field
                          type="radio"
                          name="year"
                          value={`${year}`}
                          id={`inlineRadio${i}`}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                        <label htmlFor={`inlineRadio${i}`}>{year}</label>
                      </RadioButtonWrapper>
                    ))}
                  </RadioGroup>
                </RadioForm>
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
