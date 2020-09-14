// @flow
import React from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MobileTitlebar } from 'src/components/titlebar';
import { ErrorBoundary } from 'src/components/error';
import { isViewingMarketingPage } from 'src/helpers/is-viewing-marketing-page';

const GlobalTitlebar = (props) => {
  const {
    title = 'Foundry',
    titleIcon = null,
    rightAction = null,
    leftAction = 'menu',
    history,
  } = props;

  if (isViewingMarketingPage(history, true)) {
    return null;
  }

  return (
    <ErrorBoundary fallbackComponent={<MobileTitlebar title="Error" />}>
      <MobileTitlebar
        title={title}
        titleIcon={titleIcon}
        leftAction={leftAction}
        rightAction={rightAction}
      />
    </ErrorBoundary>
  );
};

const map = (state) => state.titlebar;
export default compose(withRouter, connect(map))(GlobalTitlebar);
