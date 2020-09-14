import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withFirestore, withFirebase } from 'react-redux-firebase';
import { PrimaryOutlineButton } from 'src/components/button';
import JoditEditor from 'jodit-react';

import { Error } from 'src/components/formElements';
import { FormContainer, Form, Actions } from '../../style';

class SubmitClubEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: false,
      content: '',
    };
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
      // const rawText = await this.editorInstance.save();
      const editorText = this.state.content;

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
    const { isLoading, error } = this.state;

    return (
      <FormContainer>
        <Form>
          <JoditEditor
            config={{
              readonly: false,
              removeButtons: [
                'source',
                'eraser',
                'font',
                'file',
                'copyformat',
                'print',
                'about',
              ],
            }}
            tabIndex={1} // tabIndex of textarea
            onBlur={this.onSave}
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
