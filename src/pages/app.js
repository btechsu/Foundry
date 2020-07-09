import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';

// components
import ErrorPage from './404';
import { Login, Signup, ResetPassword, PasswordSent } from '@app';

const App = ({ data }) => {
  const signupDoc = data.prismic.allSignups.edges.slice(0, 1).pop();

  return (
    <Router basepath="/app" component={React.Fragment}>
      <ErrorPage default />
      <Login path="/login" />
      <Signup data={signupDoc.node} path="/signup" />
      <ResetPassword path="/secret/new" />
      <PasswordSent path="/secret/sent" />
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
