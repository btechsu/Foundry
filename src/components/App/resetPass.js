import React from 'react';

// styles
import styled from 'styled-components';
import { mixins, FormGroup, Container, theme, ClickableButton } from '@styles';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address'),
});

export default () => (
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
                  <FormButton disabled={!dirty || isSubmitting} type="submit">
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
