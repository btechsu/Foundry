// @flow
import * as React from 'react';
import Home from './home';
import Privacy from './privacy';
import { StyledViewGrid } from './style';

class Pages extends React.Component {
  renderPage = () => {
    switch (this.props.match.path) {
      case '/privacy':
      case '/privacy.html': {
        return <Privacy {...this.props} />;
      }
      case '/':
      case '/about':
      default: {
        return <Home {...this.props} />;
      }
    }
  };

  render() {
    return (
      <StyledViewGrid>
        <div style={{ position: 'relative' }}>{this.renderPage()}</div>
      </StyledViewGrid>
    );
  }
}

export default Pages;
