import React from 'react';
import { Link } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { FormGroup, ClickableButton, mixins } from '@styles';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginFormContainer = styled.div`
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
const StyledLink = styled(Link)`
  ${mixins.inlineLink};
`;
const ForgotContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FormSchema = Yup.object().shape({
  email: Yup.string().required('Email field is required'),
  password: Yup.string().required('Password field is required'),
});

const LoginForm = () => {
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
                  <ForgotContainer>
                    <StyledLink to={ROUTES.FORGOT_PASSWORD}>
                      I forgot my password
                    </StyledLink>
                  </ForgotContainer>
                  <FormButton disabled={!dirty || isSubmitting} type="submit">
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
