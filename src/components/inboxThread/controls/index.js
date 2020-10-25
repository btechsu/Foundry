import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { ThreadWrapper } from './style';
import { ErrorBoundary } from 'src/components/error';
import ActionsDropdown from './actionsDropdown';

class ThreadControls extends React.Component {
  render() {
    const { thread, club, id, channel } = this.props;

    return (
      <ThreadWrapper>
        <ErrorBoundary>
          <ActionsDropdown
            club={club}
            id={id}
            thread={thread}
            channel={channel}
          />
        </ErrorBoundary>
      </ThreadWrapper>
    );
  }
}

export default compose(connect())(ThreadControls);
