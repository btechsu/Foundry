import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';

// components
import ErrorPage from './404';
import { Login, Signup, ResetPassword } from '@app';

const App = ({ location, data }) => {
  const signupDoc = data.prismic.allSignups.edges.slice(0, 1).pop();

  return (
    <Router basepath="/app" component={React.Fragment}>
      <ErrorPage default />
      <Login path="/login" />
      <Signup data={signupDoc.node} path="/signup" />
      <ResetPassword path="/secret/new" />
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
  location: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
};
