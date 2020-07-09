import React from 'react';
import PropTypes from 'prop-types';
import serializeHyperlink from '@components/serializeHyperlink';
import { RichText } from 'prismic-reactjs';

// styles
import styled from 'styled-components';
import { FormGroup, ClickableButton, mixins } from '@styles';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email field is required')
    .email('Please enter a valid email address')
    .matches(
      '^[A-Za-z0-9._%+-]+@bths.edu$',
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
            onSubmit={(values, { setSubmitting }) => {
              alert(JSON.stringify(values));
            }}
          >
            {({ isSubmitting, dirty }) => (
              <Form>
                <FormGroup>
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
                  <FormButton disabled={!dirty || isSubmitting} type="submit">
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
