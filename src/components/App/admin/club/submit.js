import React, { Component } from 'react';
import { ROUTES } from '@utils';
import { navigate } from 'gatsby';

// styles
import styled from 'styled-components';
import {
  mixins,
  FormGroup,
  ClickableButton,
  Card,
  GridWrapper,
  GridCol,
} from '@styles';
import NProgress from 'nprogress';
import { Circles, PageWrapper } from '@components/loader';

// editor
import EditorJs from 'react-editor-js';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';
import Underline from '@editorjs/underline';

// form
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
const StyledSelect = styled(FormGroup)`
  select {
    -webkit-appearance: none;
  }
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
  simpleImage: SimpleImage,
  underline: Underline,
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
  credits: Yup.string().required('Amount of club credits are required'),
  days: Yup.string().required('Please specify day(s) that your club meets'),
  time: Yup.string().required('Please specify the time your club starts at'),
  type: Yup.string().required('Please pick what type of club you have'),
});

class Submit extends Component {
  state = {
    club: undefined,
    name: undefined,
    email: undefined,
    description: undefined,
    room: undefined,
    days: undefined,
    credits: undefined,
    time: undefined,
    type: undefined,
    text: undefined,
  };

  componentDidMount() {
    this.props.firebase
      .getClubSubmission({ clubID: this.props.clubID })
      .then((doc) => {
        if (doc.exists) {
          this.setState({
            club: true,
            name: doc.data().name,
            email: doc.data().president,
            description: doc.data().description,
            room: doc.data().room,
            days: doc.data().days,
            credits: doc.data().credits,
            time: doc.data().time,
            type: doc.data().type,
            text: doc.data().text,
          });
        } else {
          this.setState({ club: null });
        }
      })
      .catch(() => {
        this.setState({ club: null });
      });
    return this.editorInstance;
  }

  submitForm({ values, setSubmitting, setStatus, accept }) {
    setSubmitting(true);
    NProgress.start();
    this.editorInstance
      .save()
      .then((edit) => {
        return this.props.firebase.addClub({
          objectID: this.props.clubID,
          accept: accept,
          name: values.name,
          email: values.email,
          description: values.description,
          room: values.room,
          days: values.days,
          time: values.time,
          type: values.type,
          text: edit.blocks,
          credits: values.credits,
        });
      })
      .then(() => {
        navigate(ROUTES.ADMIN);
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
    if (this.state.club === undefined) {
      return (
        <PageWrapper>
          <Circles />
        </PageWrapper>
      );
    }

    if (this.state.club === null) {
      navigate('/404');
      return null;
    }

    const blocks = JSON.parse(this.state.text);
    let data = {
      blocks: blocks,
    };

    return (
      <Formik
        initialValues={{
          name: this.state.name,
          email: this.state.email,
          description: this.state.description,
          room: this.state.room,
          days: this.state.days,
          credits: this.state.credits,
          time: this.state.time,
          type: this.state.type,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          this.submitForm({
            values: values,
            setSubmitting: setSubmitting,
            setStatus: setStatus,
            accept: true,
          });
        }}
      >
        {({
          isSubmitting,
          submitCount,
          status,
          values,
          setSubmitting,
          setStatus,
        }) => (
          <Form>
            <GridCol>
              <GridWrapper align="flex-start">
                <GridCol>
                  <Card>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="email">Club name</label>
                      <Field
                        type="name"
                        name="name"
                        id="name"
                        placeholder="Name"
                      />
                      <ErrorMessage component="span" name="name" />
                    </FormGroup>
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
                    <StyledSelect>
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
                    </StyledSelect>
                    <FormGroup>
                      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                      <label htmlFor="credits">
                        Club credits (per semester)
                      </label>
                      <Field
                        type="text"
                        name="credits"
                        id="credits"
                        placeholder="5"
                      />
                      <ErrorMessage component="span" name="credits" />
                    </FormGroup>
                    {!!status && <FormError>{status}</FormError>}
                    <FormButton
                      disabled={isSubmitting || submitCount >= 5}
                      type="submit"
                    >
                      Approve
                    </FormButton>
                    <FormButton
                      onClick={() => {
                        this.submitForm({
                          values: values,
                          setSubmitting: setSubmitting,
                          setStatus: setStatus,
                          accept: false,
                        });
                      }}
                    >
                      Deny
                    </FormButton>
                  </Card>
                </GridCol>
                <GridCol spans={8}>
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
                </GridCol>
              </GridWrapper>
            </GridCol>
          </Form>
        )}
      </Formik>
    );
  }
}

export default Submit;
