import React, { createRef, useContext } from 'react';

// styles
import styled from 'styled-components';
import {
  Card,
  FormGroup,
  ClickableButton,
  theme,
  media,
  mixins,
} from '@styles';
import NProgress from 'nprogress';

// form logic
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { FirebaseContext } from '@Firebase';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 4;
  z-index: 1;

  ${media.desktop`grid-column-end: span 6;`};
  ${media.tablet`grid-column-end: span 12;`};
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body';
  grid-gap: 0.5rem;
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-area: header;
`;
const HeaderItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
`;
const HeaderText = styled.h3`
  color: var(--color-text);
  margin: 0;
  font-size: ${fontSizes.xl};
`;
const BodyWrapper = styled.div`
  grid-area: body;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RegistrationContainer = styled.div`
  width: 100%;
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
  oldPassword: Yup.string().required('Your old password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .max(100)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain 8 characters, at least one lower case letter, upper case letter, and number'
    ),
});

const PasswordCard = () => {
  const { firebase, user } = useContext(FirebaseContext) || {};
  const recaptchaRef = createRef();

  if (!firebase) return null;

  return (
    <GridWrapper>
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              <span role="img" aria-label="">
                🔑
              </span>{' '}
              Change password
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        <BodyWrapper>
          <RegistrationContainer>
            <Formik
              initialValues={{
                oldPassword: undefined,
                newPassword: undefined,
              }}
              validationSchema={FormSchema}
              onSubmit={(values, { setSubmitting, setStatus }) => {
                recaptchaRef.current.execute();
                function changePassword() {
                  setSubmitting(true);
                  NProgress.start();

                  let credential = firebase.getCurrentCredential({
                    email: user.email,
                    password: values.oldPassword,
                  });
                  firebase.auth.currentUser
                    .reauthenticateWithCredential(credential)
                    .then(() => {
                      return firebase.auth.currentUser.updatePassword(
                        values.newPassword
                      );
                    })
                    .then(() => {
                      setSubmitting(false);
                      NProgress.done(true);
                      setStatus('Success');
                    })
                    .catch((err) => {
                      if (err.code === 'auth/wrong-password') {
                        setStatus(
                          'The current password you entered is incorrect. If you forgot your password, you can reset it on the login page.'
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

                if (recaptchaRef.current.getValue() === undefined) {
                  recaptchaRef.current.executeAsync().then(() => {
                    return changePassword();
                  });
                } else {
                  return changePassword();
                }
              }}
            >
              {({ isSubmitting, dirty, submitCount, status }) => (
                <Form>
                  <FormGroup>
                    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                    <label htmlFor="oldPassword">Old password</label>
                    <Field
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                      placeholder="Old password"
                      autoComplete="password"
                    />
                    <ErrorMessage component="span" name="oldPassword" />
                  </FormGroup>
                  <FormGroup>
                    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                    <label htmlFor="newPassword">New password</label>
                    <Field
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="New passoword"
                      autoComplete="new-password"
                    />
                    <ErrorMessage component="span" name="newPassword" />
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
                      Change password
                    </FormButton>
                  </div>
                </Form>
              )}
            </Formik>
          </RegistrationContainer>
        </BodyWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default PasswordCard;
