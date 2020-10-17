import React, { Component } from 'react';
import Icon from 'src/components/icon';
import { FullscreenViewContainer, CloseLink } from './style';
import { ESC } from 'src/helpers/keycodes';

class FullscreenView extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress = (e) => {
    const { closePath } = this.props;
    // if person taps esc, close the dialog
    if (closePath && e.keyCode === ESC) {
      return (window.location = closePath);
    }
  };

  render() {
    const { closePath, children } = this.props;

    return (
      <FullscreenViewContainer>
        <CloseLink href={closePath}>
          <Icon glyph={'view-close'} size={32} />
        </CloseLink>

        {children}
      </FullscreenViewContainer>
    );
  }
}

export default FullscreenView;
