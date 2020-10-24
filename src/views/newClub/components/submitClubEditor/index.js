import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withFirestore, withFirebase } from 'react-redux-firebase';
import { PrimaryOutlineButton } from 'src/components/button';
import Icon from 'src/components/icon';
import Tooltip from 'src/components/tooltip';
import Textarea from 'react-textarea-autosize';
import { SegmentedControl, Segment } from 'src/components/segmentedControl';
import ReactMarkdown from 'react-markdown';

import { Error } from 'src/components/formElements';
import {
  ThreadInputs,
  ThreadDescription,
  InputHints,
  DesktopLink,
  Actions as MardownActions,
} from '../submitClubForm/style';
import { FormContainer, Form, Actions } from '../../style';

class SubmitClubEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: false,
      content: '',
      showPreview: false,
    };
  }

  cutFileExtension(imageName) {
    return imageName.split('.').pop();
  }

  onSave = (e) => {
    if (e) {
      return this.setState({
        content: e.target.innerHTML,
        error: false,
      });
    }
  };

  submit = async () => {
    try {
      this.setState({ isLoading: true });
      const { prevPage, user, firebase, firestore } = this.props;
      const editorText = this.state.content;
      let coverFile = null;
      let pfpFile = null;

      if (editorText.length > 1010000) {
        return this.setState({
          error: 'The text is too long - trim it up a bit!',
        });
      }

      if (prevPage.coverFile !== null) {
        const uploadRef = await firebase.uploadFile(
          `clubSubmissions/${prevPage.slug}/cover`,
          prevPage.coverFile,
        );
        coverFile = await uploadRef.uploadTaskSnaphot.ref.getDownloadURL();
      }
      if (prevPage.file !== null) {
        const uploadRef = await firebase.uploadFile(
          `clubSubmissions/${prevPage.slug}/pfp`,
          prevPage.file,
        );
        pfpFile = await uploadRef.uploadTaskSnaphot.ref.getDownloadURL();
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
        cover: coverFile,
        pfp: pfpFile,
        admins: [],
        superadmin: user.email,
      });

      // await firestore
      //   .collection('clubSubmissions')
      //   .doc(prevPage.slug)
      //   .collection('channels')
      //   .doc('welcome')
      //   .set({ name: 'welcome' });

      // await firestore
      //   .collection('clubSubmissions')
      //   .doc(prevPage.slug)
      //   .collection('channels')
      //   .doc('welcome')
      //   .collection('posts').add({})

      this.setState({ isLoading: false });
      this.props.finalPage();
    } catch (err) {
      this.setState({ isLoading: false, error: err });
    }
  };

  render() {
    const { isLoading, error, showPreview, content } = this.state;

    return (
      <FormContainer>
        <Form>
          <SegmentedControl css={{ background: '#FFF', minHeight: '52px' }}>
            <Segment
              isActive={!showPreview}
              onClick={() => this.setState({ showPreview: false })}
            >
              Write
            </Segment>
            <Segment
              isActive={showPreview}
              onClick={() => this.setState({ showPreview: true })}
            >
              Preview
            </Segment>
          </SegmentedControl>
          <ThreadInputs>
            {showPreview ? (
              <div style={{ marginBottom: '25px' }}>
                <ReactMarkdown source={content} />
              </div>
            ) : (
              <Textarea
                value={content}
                onChange={(e) => this.setState({ content: e.target.value })}
                style={ThreadDescription}
                placeholder="Type more about your club here"
                className={'threadComposer'}
                dataCy="rich-text-editor"
              />
            )}
          </ThreadInputs>
          <MardownActions>
            <InputHints>
              <Tooltip content={'Style with Markdown'}>
                <DesktopLink
                  target="_blank"
                  href="https://guides.github.com/features/mastering-markdown/"
                >
                  <Icon glyph="markdown" />
                </DesktopLink>
              </Tooltip>
            </InputHints>
          </MardownActions>
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
