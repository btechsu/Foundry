import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { ROUTES, isloggedin } from '@utils';
import Title from './Title';

const PrivateRoute = ({ component: Component, location, title, ...rest }) => {
  if (!isloggedin()) {
    navigate(ROUTES.LOGIN);
    return null;
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
