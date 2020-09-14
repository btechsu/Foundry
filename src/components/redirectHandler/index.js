// @flow
/* eslint-disable max-len */
import * as React from 'react';
import queryString from 'query-string';
import { history } from 'src/helpers/history';
import { isLoaded } from 'react-redux-firebase';
import Routes from '../../hot-routes';

class RedirectHandler extends React.Component {
  componentDidUpdate(prev) {
    const curr = this.props;
    const params = queryString.parse(history.location.search);
    const doneFetching = prev.isLoadingCurrentUser && isLoaded();

    if (doneFetching) {
      // Redirect ?t=asdfxyz to the thread view only for anonymous users who wouldn't see it
      // in their inbox view (since they don't have an inbox view)
      if (!isLoaded() && params.t) {
        history.replace(`/thread/${params.t}`);
      }
    }
  }

  render() {
    return <Routes />;
  }
}

// export default compose(withCurrentUser)(RedirectHandler);
export default RedirectHandler;
