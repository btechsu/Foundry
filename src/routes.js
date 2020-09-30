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
import { ErrorBoundary } from 'src/components/error';
import { theme } from 'shared/theme';
import AppViewWrapper from 'src/components/appViewWrapper';
import Head from 'src/components/head';
import ModalRoot from 'src/components/modals/modalRoot';
import signedOutFallback from 'src/helpers/signed-out-fallback';
import Navigation from 'src/views/navigation';
import generateMetaInfo from 'shared/generate-meta-info';
import GlobalStyles from './reset.css';
import { LoadingView } from 'src/views/viewHelpers';
import GlobalTitlebar from './views/globalTitlebar';
import Login from 'src/views/login';
import NewUser from 'src/views/newUser';
import { NavigationContext } from 'src/helpers/navigation-context';

/* prettier-ignore */
const ErrorFallback = Loadable({
  loader: () => import('src/components/error'/* webpackChunkName: "Error" */),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

/* prettier-ignore */
const Pages = Loadable({
  loader: () => import('src/views/pages'/* webpackChunkName: "Splash" */),
  loading: ({ isLoading }) => isLoading && null,
});

const Clubs = Loadable({
  loader: () => import('src/views/clubs' /* webpackChunkName: "Clubs" */),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

const HomeViewRedirectFallback = signedOutFallback(
  () => <Redirect to="/clubs" />,
  Pages,
);
const LoginFallback = signedOutFallback(() => <Redirect to="/" />, Login);
const NewUserFallback = signedOutFallback(() => <Redirect to="/" />, NewUser);

const SubmitClub = Loadable({
  loader: () => import('src/views/newClub' /* webpackChunkName: "NewClub" */),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});
const SubmitClubFallback = signedOutFallback(SubmitClub, () => (
  <Redirect to="/login" />
));

const ClubView = Loadable({
  loader: () => import('./views/club' /* webpackChunkName: "ClubView" */),
  loading: ({ isLoading }) => isLoading && <LoadingView />,
});

export const RouteModalContext = React.createContext({
  isModal: false,
});

class Routes extends React.Component {
  previousLocation = this.props.location;
  state = { navigationIsOpen: false };

  setNavigationIsOpen = (val) => this.setState({ navigationIsOpen: val });

  render() {
    const { navigationIsOpen } = this.state;
    const { title, description } = generateMetaInfo();

    const { location } = this.props;
    const isModal = false;

    // allows any UI in the tree to open or close the side navigation on mobile
    const navigationContext = {
      navigationIsOpen,
      setNavigationIsOpen: this.setNavigationIsOpen,
    };

    // allows any UI in the tree to know if it is existing within a modal or not
    // commonly used for background views to know that they are backgrounded
    const routeModalContext = { isModal };

    return (
      <ErrorBoundary fallbackComponent={ErrorFallback}>
        <ThemeProvider theme={theme}>
          <NavigationContext.Provider value={navigationContext}>
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
                <Route component={Navigation} />
                <Route component={GlobalTitlebar} />

                <div css={isModal ? { overflow: 'hidden' } : {}}>
                  <Switch location={isModal ? this.previousLocation : location}>
                    {/* Public Pages */}
                    <Route
                      path="/"
                      component={HomeViewRedirectFallback}
                      exact
                    />
                    <Route path="/privacy" component={Pages} />

                    {/* App Pages */}
                    <Route path="/login" component={LoginFallback} />
                    <Route path="/new/user" component={NewUserFallback} />
                    <Route path="/clubs" component={Clubs} />
                    <Route path="/new/club" component={SubmitClubFallback} />
                    <Route path="/:clubSlug" component={ClubView} />
                  </Switch>
                </div>
              </AppViewWrapper>
            </RouteModalContext.Provider>
          </NavigationContext.Provider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }
}

export default compose(withRouter)(Routes);
