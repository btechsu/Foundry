import React from 'react';

// styles
import styled from 'styled-components';
import { Card, theme, media, mixins } from '@styles';

// form logic
import { Formik, Form, Field } from 'formik';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 4;

  ${media.desktop`grid-column-end: span 6;`};
  ${media.tablet`grid-column-end: span 12;`};
`;
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

const EmailCard = () => {
  return (
    <GridWrapper>
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
        <BodyWrapper>
          <Formik
            initialValues={{ roles: ['grade', 'clubs', 'updates', 'news'] }}
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          >
            {() => (
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
              </Form>
            )}
          </Formik>
        </BodyWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default EmailCard;
