import * as React from 'react';
import { Timestamp } from './style';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 3600000;
const MS_PER_DAY = 86400000;
const MS_PER_YEAR = 31536000000;

function timeDifferenceShort(current, previous) {
  const elapsed = current - previous;

  if (elapsed < MS_PER_MINUTE) {
    return Math.round(elapsed / MS_PER_SECOND) + 's';
  } else if (elapsed < MS_PER_HOUR) {
    return Math.round(elapsed / MS_PER_MINUTE) + 'm';
  } else if (elapsed < MS_PER_DAY) {
    return Math.round(elapsed / MS_PER_HOUR) + 'h';
  } else if (elapsed < MS_PER_YEAR) {
    return Math.round(elapsed / MS_PER_DAY) + 'd';
  } else {
    return Math.round(elapsed / MS_PER_YEAR) + 'y';
  }
}

class ThreadTimestamp extends React.Component {
  render() {
    const { thread } = this.props;

    const now = new Date().getTime();
    const then = thread.lastActive || thread.createdAt;
    let timestamp = timeDifferenceShort(now, thread.posted.toDate());
    if (timestamp.slice(-1) === 's') {
      timestamp = 'Just now';
    }

    return (
      <React.Fragment>
        <Timestamp>{timestamp}</Timestamp>
      </React.Fragment>
    );
  }
}

export default ThreadTimestamp;
