import * as React from 'react';
import Nav from './components/nav';
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
    const {
      match: { path },
    } = this.props;
    const dark = path === '/' || path === '/about';

    return (
      <StyledViewGrid>
        <div style={{ position: 'relative' }}>
          <Nav
            dark={dark ? 'true' : undefined}
            location={this.props.match.path.substr(1)}
          />
          {this.renderPage()}
        </div>
      </StyledViewGrid>
    );
  }
}

export default Pages;
