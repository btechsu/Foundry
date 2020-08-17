// @flow
/**
 * This components acts as the layout for the entire app. Meaning, every single
 * page and component is wrapped in this file. This component sorts though the
 * different routes in our app and returns a page, sets modals and toasts, and
 * hold our head information for the page.
 */
import * as React from 'react';
import compose from 'recompose/compose';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import { ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import { ErrorBoundary } from '@components/error';
import { theme } from '@shared/theme';
import AppViewWrapper from '@components/appViewWrapper';
import Head from '@components/head';
import ModalRoot from '@components/modals/modalRoot';
import generateMetaInfo from '@shared/generate-meta-info';
import GlobalStyles from './reset.css';
import { LoadingView } from '@views/viewHelpers';
import signedOutFallback from '@helpers/signed-out-fallback';
import Login from '@views/login';

/* prettier-ignore */
const ErrorFallback = Loadable({
  loader: () => import('@components/error'/* webpackChunkName: "Error" */),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

/* prettier-ignore */
const Pages = Loadable({
  loader: () => import('@views/pages'/* webpackChunkName: "Splash" */),
  loading: ({ isLoading }) => isLoading && null,
});

const LoginFallback = signedOutFallback(Login, () => <Redirect to="/" />);

export const RouteModalContext = React.createContext({
  isModal: false,
});

class Routes extends React.Component {
  previousLocation = this.props.location;

  render() {
    const { location } = this.props;
    const { title, description } = generateMetaInfo();
    const isModal = false;

    // allows any UI in the tree to know if it is existing within a modal or not
    // commonly used for background views to know that they are backgrounded
    const routeModalContext = { isModal };

    return (
      <ErrorBoundary fallbackComponent={ErrorFallback}>
        <ThemeProvider theme={theme}>
          {/* meta tags get overridden by anything further down the tree */}
          <Head title={title} description={description} />
          <GlobalStyles />

          {/* dont let non-critical pieces of UI crash the whole app */}
          <ErrorBoundary>
            <ModalRoot />
          </ErrorBoundary>

          <RouteModalContext.Provider value={routeModalContext}>
            {/*
              we tell the app view wrapper any time the modal state
              changes so that we can restore the scroll position to where
              it was before the modal was opened
            */}
            <AppViewWrapper {...routeModalContext}>
              <Switch location={isModal ? this.previousLocation : location}>
                {/* Public Pages */}
                <Route path="/" component={Pages} exact />
                <Route path="/login" component={LoginFallback} />
                <Route path="/privacy" component={Pages} />
              </Switch>
            </AppViewWrapper>
          </RouteModalContext.Provider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }
}

export default compose(withRouter)(Routes);
