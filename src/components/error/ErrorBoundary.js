import * as React from 'react';
import BlueScreen from './BlueScreen';

class ErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch = (error, errorInfo) => {
    this.setState({ error });
    console.error({ error });
    return (
      window.Raven && window.Raven.captureException(error, { extra: errorInfo })
    );
  };

  render() {
    const { fallbackComponent } = this.props;
    const { error } = this.state;
    const {
      fallbackComponent: FallbackComponent = null,
      children,
    } = this.props;

    if (error) {
      if (fallbackComponent) {
        // $FlowFixMe
        return <FallbackComponent />;
      }

      if (!fallbackComponent) {
        return null;
      }

      return <BlueScreen />;
    }

    return children;
  }
}

export default ErrorBoundary;
