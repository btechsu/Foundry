/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './components/app';
import { Router } from 'react-router';
import Loadable from 'react-loadable';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { HelmetProvider } from 'react-helmet-async';
import webPushManager from './helpers/web-push-manager';
import { initStore } from './store';
import { history } from './helpers/history';
import Routes from './hot-routes';

// If the server passes an initial redux state use that, otherwise construct our own
const initialState = window.___INITIAL_STATE__ || {
  firebase: { authError: null },
};

const store = initStore(initialState);

const App = () => {
  return (
    <AppWrapper store={store}>
      <HelmetProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </HelmetProvider>
    </AppWrapper>
  );
};

const rootElement = document.getElementById('root');

// eslint-disable-next-line no-underscore-dangle
const renderMethod = rootElement.hasChildNodes()
  ? ReactDOM.hydrate
  : ReactDOM.render;

function render() {
  return renderMethod(
    <App />,
    // $FlowIssue
    rootElement,
  );
}

OfflinePluginRuntime.install({
  // Apply new updates immediately
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
});

if ('serviceWorker' in navigator && 'PushManager' in window) {
  // $FlowIssue
  navigator.serviceWorker.ready.then((registration) => {
    webPushManager.set(registration.pushManager);
  });
}

Loadable.preloadReady()
  .then(render)
  .catch((err) => {
    console.error(err);
  });
