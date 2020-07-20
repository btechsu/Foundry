import React, { useContext } from 'react';

// styles
import styled from 'styled-components';
import { theme, mixins, Card, GridCol } from '@styles';
import { FormattedIcon } from '@components/icons';
import NProgress from 'nprogress';

// logic
import { Formik, Form, Field } from 'formik';
import { isEqual, sortBy } from 'lodash';
import { FirebaseContext } from '@Firebase';

const { fontSizes } = theme;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body' 'footer';
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
`;
const FooterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
const FooterButton = styled.button`
  ${mixins.resetButton}
  color: var(--color-primary);
  display: ${(props) => (props.hide ? 'none' : 'inline-block')};

  :hover {
    text-decoration: underline;
  }

  svg {
    overflow: hidden;
    position: relative;
    top: 0.425rem;
    fill: currentcolor;
    height: 24;
    width: 24;
  }
`;

const CustomCheckbox = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: transparent;
  position: absolute;
  left: 0;
  top: 0;
  border: 2px solid var(--color-gray-700);
`;
const LabelWrapper = styled.label`
  display: inline-block;
  padding-left: 30px;
  position: relative;
  cursor: pointer;
  user-select: none;
  margin-bottom: 1rem;

  input {
    display: none;
  }

  input:checked + ${CustomCheckbox} {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
  }

  input:checked + ${CustomCheckbox}:after {
    content: '';
    position: absolute;
    height: 6px;
    width: 11px;
    border-left: 2px solid var(--color-always-white);
    border-bottom: 2px solid var(--color-always-white);
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
const StyledTitle = styled.h4`
  font-size: ${fontSizes.lg};
  margin-bottom: 0.3rem;
`;
const StyledDescription = styled.p`
  ${mixins.regularText}
  margin: 0;
`;
const Loading = styled.div`
  background-color: var(--color-muted);
  border-radius: 1.5rem;
  width: 100%;
  height: 4rem;
  margin: 1rem 0;
`;
const FormMessage = styled.span`
  color: ${(props) =>
    props.type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
  display: inline-block;
  margin-bottom: 1rem;
`;

function Checkbox(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <LabelWrapper>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          <CustomCheckbox />
          <StyledTitle>
            <strong>{props.title}</strong>
          </StyledTitle>
          <StyledDescription>{props.description}</StyledDescription>
        </LabelWrapper>
      )}
    </Field>
  );
}
const EmailBody = () => {
  const { user, firebase } = useContext(FirebaseContext);

  if (!user || !firebase) {
    return (
      <BodyWrapper>
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </BodyWrapper>
    );
  } else {
    return (
      <BodyWrapper>
        <Formik
          initialValues={{
            roles: !user.emailPrefs ? [] : sortBy(user.emailPrefs),
          }}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            NProgress.start();
            setSubmitting(true);
            firebase
              .updateEmail({
                selected: values.roles,
                userID: user.uid,
              })
              .then(() => {
                NProgress.done(true);
                setSubmitting(false);
                setStatus({
                  type: 'success',
                  message: 'Successfully updated your email preferences!',
                });
                setTimeout(() => {
                  setStatus(null);
                }, 3000);
              })
              .catch((err) => {
                NProgress.done(true);
                setSubmitting(false);
                setStatus({
                  type: 'error',
                  message:
                    err.message ||
                    'An unknown error occured. Try refreshing the page.',
                });
              });
          }}
        >
          {({ initialValues, values, status }) => (
            <Form>
              <div>
                <Checkbox
                  name="roles"
                  value="clubs"
                  title="Clubs"
                  description="Announcements posted by clubs you're in."
                />
                <Checkbox
                  name="roles"
                  value="grade"
                  title="Grade"
                  description="Announcements posted for your grade level."
                />
                <Checkbox
                  name="roles"
                  value="news"
                  title="News"
                  description="Get weekly emails with new articles."
                />
                <Checkbox
                  name="roles"
                  value="updates"
                  title="Updates"
                  description="Get emails when we update the platform."
                />
              </div>
              {!!status && (
                <FormMessage type={status.type}>{status.message}</FormMessage>
              )}
              <FooterWrapper>
                <FooterButton
                  hide={isEqual(
                    sortBy(initialValues.roles),
                    sortBy(values.roles)
                  )}
                  type="submit"
                >
                  Change preferences <FormattedIcon name="right-arrow" />
                </FooterButton>
              </FooterWrapper>
            </Form>
          )}
        </Formik>
      </BodyWrapper>
    );
  }
};
const EmailCard = () => {
  return (
    <GridCol tabletSpans={6}>
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              <span role="img" aria-label="">
                📥
              </span>{' '}
              Mail settings
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        <EmailBody />
      </StyledCard>
    </GridCol>
  );
};

export default EmailCard;
