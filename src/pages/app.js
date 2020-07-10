import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import UnprivateRoute from '@components/UnprivateRoute';
import PrivateRoute from '@components/PrivateRoute';

// components
import ErrorPage from './404';
import { Login, Signup, ResetPassword, PasswordSent, Dashboard } from '@app';

const App = ({ data }) => {
  const signupDoc = data.prismic.allSignups.edges.slice(0, 1).pop();

  return (
    <Router basepath="/app" component={React.Fragment}>
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
      <PrivateRoute path="/dashboard" component={Dashboard} title="Dashboard" />
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
    }
  }
`;

App.propTypes = {
  data: PropTypes.object.isRequired,
};
