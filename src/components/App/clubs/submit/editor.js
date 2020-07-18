import React, { Component, createRef } from 'react';
import { navigate } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import {
  media,
  theme,
  mixins,
  FormGroup,
  ClickableButton,
  Card,
} from '@styles';
import NProgress from 'nprogress';

// editor
import EditorJs from 'react-editor-js';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import SimpleImage from '@editorjs/simple-image';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import Underline from '@editorjs/underline';

// form
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

const { fontSizes } = theme;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 3rem;
  align-items: flex-start;

  @media only screen and (min-width: 64rem) {
    grid-column-gap: 2rem;
  }

  .ce-inline-toolbar__dropdown,
  .ce-conversion-toolbar__tools {
    color: var(--color-always-black);
  }
`;
const FormWrapper = styled.div`
  display: grid;
  grid-column-end: span 4;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
`;
const EditorWrapper = styled.div`
  display: grid;
  grid-column-end: span 8;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
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
const SmallText = styled.p`
  font-size: ${fontSizes.sm};
  color: var(--color-gray-700);
  margin-top: 0;
  margin-bottom: 1rem;
`;

const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: List,
  header: {
    class: Header,
    inlineToolbar: true,
  },
  quote: Quote,
  table: Table,
  simpleImage: SimpleImage,
  inlineCode: InlineCode,
  underline: Underline,
  warning: Warning,
};
let data = {
  blocks: [
    {
      type: 'header',
      data: {
        text: 'Replace this with something about your club',
        level: 1,
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'Your club description will go here. Our advanced editor allows you to add different components like paragraphs, lists, quotes, and more. We recommend you be as descriptive as you can when writing this section, as this is what someone will look at the most before joining a club.',
      },
    },
    {
      type: 'paragraph',
      data: {
        text:
          'You can add things like club hours, dates, things you do, why you should join, things to have ready, people in the club, etc.',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'You should keep writing, the more the better!',
      },
    },
  ],
};
const FormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email field is required')
    .email('Please enter a valid email address')
    .matches(
      /^[A-Za-z0-9._%+-]+@bths.edu$/,
      'Please use your Brooklyn Tech email'
    ),
  description: Yup.string()
    .required('A short description is required')
    .max(250, 'Please keep your description under 250 characters')
    .min(100, 'Your description has to be longer than 100 characters'),
  room: Yup.string().required('A club room is required'),
  days: Yup.string().required('Please specify day(s) that your club meets'),
  time: Yup.string().required('Please specify the time your club starts at'),
  type: Yup.string().required('Please pick what type of club you have'),
});

class Editor extends Component {
  componentDidMount() {
    return this.editorInstance; // access editor-js
  }
  submitForm({ values, setSubmitting, setStatus }) {
    this.editorInstance
      .save()
      .then((edit) => {
        return this.props.firebase.submitClub({
          email: values.email,
          description: values.description,
          room: values.room,
          days: values.days,
          time: values.time,
          type: values.type,
          text: edit.blocks,
        });
      })
      .then(() => {
        navigate(ROUTES.SUBMIT_CLUB_SUCESS);
        setSubmitting(false);
        NProgress.done(true);
      })
      .catch((err) => {
        setStatus(
          err.message || 'An unknown error occured. Try refreshing the page.'
        );
        setSubmitting(false);
        NProgress.done(true);
      });
  }

  render() {
    const recaptchaRef = createRef();

    return (
      <Formik
        initialValues={{
          email: undefined,
          description: undefined,
          room: undefined,
          days: undefined,
          time: undefined,
          type: undefined,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          if (recaptchaRef.current.getValue() === '') {
            setSubmitting(true);
            NProgress.start();
            recaptchaRef.current
              .executeAsync()
              .then(() => {
                return this.props.firebase.verifyCaptchaToken({
                  token: recaptchaRef.current.getValue(),
                });
              })
              .then(() => {
                this.submitForm({
                  values: values,
                  setSubmitting: setSubmitting,
                  setStatus: setStatus,
                });
              })
              .catch((err) => {
                setStatus(err);
                setSubmitting(false);
              });
          } else {
            setSubmitting(true);
            NProgress.start();
            this.submitForm({
              values: values,
              setSubmitting: setSubmitting,
              setStatus: setStatus,
            });
          }
        }}
      >
        {({ isSubmitting, dirty, submitCount, status }) => (
          <Form>
            <FormWrapper>
              <Wrapper>
                <FormWrapper>
                  <Card>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="email">President's email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      <ErrorMessage component="span" name="email" />
                    </FormGroup>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="description">Short description</label>
                      <Field
                        type="text"
                        as="textarea"
                        name="description"
                        id="description"
                        placeholder="Our club is about..."
                      />
                      <ErrorMessage component="span" name="description" />
                    </FormGroup>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="room">Club meeting room</label>
                      <Field
                        type="text"
                        name="room"
                        id="room"
                        placeholder="5W6"
                      />
                      <ErrorMessage component="span" name="room" />
                    </FormGroup>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="days">Meeting days</label>
                      <Field
                        type="text"
                        name="days"
                        id="days"
                        placeholder='"Mondays", "Wednedays & Thursdays", etc'
                      />
                      <ErrorMessage component="span" name="days" />
                    </FormGroup>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="time">Meeting time</label>
                      <Field
                        type="text"
                        name="time"
                        id="time"
                        placeholder="3:50pm, 4:00pm, etc."
                      />
                      <ErrorMessage component="span" name="time" />
                    </FormGroup>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="days">Type</label>
                      <Field
                        as="select"
                        name="type"
                        id="type"
                        placeholder="Type"
                      >
                        {/* eslint-disable jsx-a11y/control-has-associated-label */}
                        <option value={undefined} label="Select type of club" />
                        <option value="creative">Creative</option>
                        <option value="social">Social</option>
                        <option value="stem">STEM</option>
                        <option value="volunteering">Volunteering</option>
                        {/* eslint-enable jsx-a11y/control-has-associated-label */}
                      </Field>
                      <ErrorMessage component="span" name="type" />
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
                        disabled={isSubmitting || submitCount >= 5}
                        type="submit"
                      >
                        Submit
                      </FormButton>
                      <SmallText>
                        You cannot undo after submitting this form. Please
                        double check all your information before submitting.
                      </SmallText>
                    </div>
                  </Card>
                </FormWrapper>
                <EditorWrapper>
                  <Card>
                    <EditorJs
                      tools={EDITOR_JS_TOOLS}
                      instanceRef={(instance) =>
                        (this.editorInstance = instance)
                      }
                      data={data}
                      logLevel="ERROR"
                    />
                  </Card>
                </EditorWrapper>
              </Wrapper>
            </FormWrapper>
          </Form>
        )}
      </Formik>
    );
  }
}

export default Editor;
