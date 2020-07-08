import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { ROUTES, isloggedin } from '@utils/routes';
import Title from './Title';

const PrivateRoute = ({ component: Component, location, title, ...rest }) => {
  if (typeof window !== 'undefined') {
    if (isloggedin && location.pathname !== ROUTES.LOGIN) {
      navigate(ROUTES.LOGIN);
      return null;
    }
  }

  return (
    <>
      <Title>{title}</Title>
      <Component {...rest} />
    </>
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};
