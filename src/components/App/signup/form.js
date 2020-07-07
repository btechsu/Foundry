import React from 'react';
import PropTypes from 'prop-types';
import serializeHyperlink from '@components/serializeHyperlink';
import { RichText } from 'prismic-reactjs';

// styles
import styled from 'styled-components';
import { FormGroup, FormInput, ClickableButton, mixins } from '@styles';

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
`;

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email field is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password field is required')
    .max(100, 'Password too long')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])',
      'Password must contain at least one lower case letter, upper case letter, number, and special character'
    ),
});

const SignupForm = ({ tos, serializer }) => {
  return (
    <SignUpFormContainer>
      <FormContainer>
        <RegistrationContainer>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={FormSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
            }}
          >
            {({ isSubmitting, dirty }) => (
              <Form>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="username"
                    component={FormInput}
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
                    component={FormInput}
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
                    htmlSerializer={serializer}
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
  tos: PropTypes.string.isRequired,
  serializer: PropTypes.array.isRequired,
};
