import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';

import UnprivateRoute from '@components/UnprivateRoute';
import PrivateRoute from '@components/PrivateRoute';
import Loader from '@components/loader';

// components
import ErrorPage from './404';
import {
  Login,
  Signup,
  ResetPassword,
  PasswordSent,
  Dashboard,
  Clubs,
  SubmitClub,
  SubmitClubSent,
  JoinClubSent,
} from '@app';

import { AdminDashboard } from '@app/admin';

const App = ({ data }) => {
  const signupDoc = data.prismic.allSignups.edges.slice(0, 1).pop();
  const dashboardDoc = data.prismic.allDashboards.edges.slice(0, 1).pop();

  return (
    <Router basepath="/app" component={Loader}>
      <ErrorPage default />
      <UnprivateRoute path="/login" component={Login} title="Login" />
      <UnprivateRoute
        path="/signup"
        component={Signup}
        title="Signup"
        data={signupDoc.node}
      />
      <UnprivateRoute
        path="/secret/new"
        component={ResetPassword}
        title="Reset your password"
      />
      <UnprivateRoute
        path="/secret/sent"
        component={PasswordSent}
        title="Password reset sent"
      />
      <PrivateRoute
        path="/dashboard"
        component={Dashboard}
        title="Dashboard"
        data={dashboardDoc.node}
      />
      <PrivateRoute
        path="/clubs/submit"
        component={SubmitClub}
        title="Submit a club"
      />
      <Clubs path="/clubs" title="Clubs" />
      <PrivateRoute
        path="/clubs/submit/success"
        component={SubmitClubSent}
        title="Submitted club"
      />
      <PrivateRoute
        path="/clubs/join/success"
        component={JoinClubSent}
        title="Submitted club application"
      />
      <PrivateRoute path="/admin" component={AdminDashboard} title="Admin" />
    </Router>
  );
};

export default App;

export const query = graphql`
  {
    prismic {
      allSignups {
        edges {
          node {
            image
            title
            label
          }
        }
      }
      allDashboards {
        edges {
          node {
            social {
              icon
              title
              text
              link {
                ... on PRISMIC__ExternalLink {
                  _linkType
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

App.propTypes = {
  data: PropTypes.object.isRequired,
};
