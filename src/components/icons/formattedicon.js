import React from 'react';
import PropTypes from 'prop-types';
import IconRightArrow from './right-arrow';
import IconCircle from './circle';
import IconSort from './sort';
import IconRoom from './room';
import IconClock from './clock';
import IconUser from './user';

const FormattedIcon = ({ name }) => {
  switch (name) {
    case 'right-arrow':
      return <IconRightArrow />;
    case 'circle':
      return <IconCircle />;
    case 'sort':
      return <IconSort />;
    case 'room':
      return <IconRoom />;
    case 'clock':
      return <IconClock />;
    case 'user':
      return <IconUser />;
    default:
      return null;
  }
};

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormattedIcon;
