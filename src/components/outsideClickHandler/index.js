import * as React from 'react';

class OutsideAlerter extends React.Component {
  componentDidMount() {
    // $FlowFixMe
    document
      .getElementById('root')
      .addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    // $FlowFixMe
    document
      .getElementById('root')
      .removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (event) => {
    // $FlowFixMe
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onOutsideClick();
    }
  };

  render() {
    const { style = {}, children } = this.props;
    return (
      // $FlowFixMe
      <div style={style} ref={this.setWrapperRef}>
        {children}
      </div>
    );
  }
}

export default OutsideAlerter;
