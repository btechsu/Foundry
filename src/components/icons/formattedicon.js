import React from 'react';
import PropTypes from 'prop-types';
import IconRightArrow from './right-arrow';
import IconCircle from './circle';
import IconSort from './sort';
import IconRoom from './room';
import IconClock from './clock';
import IconUser from './user';
import IconSearch from './search';
import IconCancel from './cancel';
import IconChevron from './chevron';
import IconError from './error';
import IconDelete from './delete';
import IconMail from './mail';
import IconSync from './sync';

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
    case 'search':
      return <IconSearch />;
    case 'cancel':
      return <IconCancel />;
    case 'chevron':
      return <IconChevron />;
    case 'error':
      return <IconError />;
    case 'delete':
      return <IconDelete />;
    case 'mail':
      return <IconMail />;
    case 'sync':
      return <IconSync />;
    default:
      return null;
  }
};

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormattedIcon;
