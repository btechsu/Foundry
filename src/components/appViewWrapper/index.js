// @flow
import React from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { StyledAppViewWrapper } from './style';

class AppViewWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.prevScrollOffset = 0;
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { isModal: currModal } = this.props;
    const { isModal: prevModal } = prevProps;

    /*
      If the user is going to open a modal, grab the current scroll
      offset of the main view the user is on and save it for now; we'll use
      the value to restore the scroll position after the user closes the modal
    */
    if (!prevModal && currModal && this.ref) {
      const offset = this.ref.scrollTop;
      this.prevScrollOffset = offset;
      return null;
    }

    if (prevModal && !currModal) {
      // the user is closing the modal, return the previous view's scroll offset
      return this.prevScrollOffset;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /*
      If we have a snapshot value, the user has closed a modal and we need
      to return the user to where they were previously scrolled in the primary
      view
    */
    if (snapshot !== null && this.ref) {
      this.ref.scrollTop = snapshot;
    }
  }

  render() {
    /*
      update this later to test if we're not viewing the app
      page, then to keep a single column layout, otherwise
      update it to a two column layout
    */
    const isTwoColumn = false;

    return (
      <StyledAppViewWrapper
        ref={(el) => (this.ref = el)}
        isTwoColumn={isTwoColumn}
        {...this.props}
      />
    );
  }
}

export default compose(withRouter)(AppViewWrapper);