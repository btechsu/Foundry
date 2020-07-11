import React from 'react';
import PropTypes from 'prop-types';
import IconRightArrow from './right-arrow';
import IconCircle from './circle';
import IconSort from './sort';

const FormattedIcon = ({ name }) => {
  switch (name) {
    case 'right-arrow':
      return <IconRightArrow />;
    case 'circle':
      return <IconCircle />;
    case 'sort':
      return <IconSort />;
    default:
      return null;
  }
};

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormattedIcon;
