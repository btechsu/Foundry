// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withFirestore, withFirebase } from 'react-redux-firebase';
import { PrimaryOutlineButton } from '@components/button';

import EditorJs from 'react-editor-js';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Underline from '@editorjs/underline';

import { Error } from '@components/formElements';
import { FormContainer, Form, Actions } from '../../style';

class SubmitClubEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false, error: false };
  }
  componentDidMount() {
    return this.editorInstance;
  }

  getFileExtension(imageType) {
    if (
      imageType === 'image/jpg' ||
      imageType === 'image/jpeg' ||
      imageType === 'image/png'
    ) {
      return true;
    }

    return false;
  }

  cutFileExtension(imageName) {
    return imageName.split('.').pop();
  }

  submit = async () => {
    try {
      this.setState({ isLoading: true });
      const { prevPage, user, firebase, firestore } = this.props;
      const rawText = await this.editorInstance.save();
      const editorText = JSON.stringify(rawText.blocks);

      if (editorText.length > 1010000) {
        return this.setState({
          error: 'The text is too long - trim it up a bit!',
        });
      }

      await firestore.collection('clubSubmissions').doc(prevPage.slug).set({
        name: prevPage.name,
        president: user.email,
        description: prevPage.description,
        room: prevPage.room,
        days: prevPage.days,
        time: prevPage.time,
        type: prevPage.type,
        credits: prevPage.credits,
        text: editorText,
      });

      // don't let insignifcant tasks stop the whole submission proccess. no error handling here
      if (prevPage.coverFile !== null) {
        if (this.getFileExtension(prevPage.coverFile.type)) {
          await firebase.uploadFile(
            `clubSubmissions/${prevPage.slug}/`,
            prevPage.coverFile,
          );
          //   const coverRef = storageRef.child(
          //     `clubSubmissions/${prevPage.slug}/cover.${this.cutFileExtension(
          //       prevPage.coverFile.name,
          //     )}`,
          //   );

          //   await coverRef.put(prevPage.coverFile);
        }
      }
      if (prevPage.file !== null) {
        if (this.getFileExtension(prevPage.file.type)) {
          await firebase.uploadFile(
            `clubSubmissions/${prevPage.slug}/`,
            prevPage.file,
          );

          //   const coverRef = storageRef.child(
          //     `clubSubmissions/${prevPage.slug}/cover.${this.cutFileExtension(
          //       prevPage.file.name,
          //     )}`,
          //   );

          //   await coverRef.put(prevPage.file);
        }
      }

      this.setState({ isLoading: false });
      this.props.finalPage();
    } catch (err) {
      this.setState({ isLoading: false, error: err });
    }
  };

  render() {
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
      underline: Underline,
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
              'Your club description will go here. Our advanced editor allows you to add different components like paragraphs, lists, and images. We recommend you be as descriptive as you can when writing this section, as this is what someone will look at the most before joining a club.',
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
            text:
              'You should keep writing, the more the better! (Hint: try pasting an image URL)',
          },
        },
      ],
    };

    const { isLoading, error } = this.state;

    return (
      <FormContainer>
        <Form>
          <EditorJs
            tools={EDITOR_JS_TOOLS}
            instanceRef={(instance) => (this.editorInstance = instance)}
            data={data}
            logLevel="ERROR"
          />
          {error && <Error>{error}</Error>}
        </Form>

        <Actions>
          <div />
          <PrimaryOutlineButton
            onClick={this.submit}
            isLoading={isLoading}
            data-cy="club-create-button"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </PrimaryOutlineButton>
        </Actions>
      </FormContainer>
    );
  }
}

export default compose(
  withFirebase,
  withFirestore,
  connect((state) => ({ user: state.firebase.auth })),
)(SubmitClubEditor);
