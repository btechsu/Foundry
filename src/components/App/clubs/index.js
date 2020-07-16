import React from 'react';
import PropTypes from 'prop-types';

import Dash from './dash';
import Title from '@components/Title';

const Clubs = ({ data }) => {
  return (
    <>
      <Title>Clubs</Title>
      <Dash data={data} />
    </>
  );
};

export default Clubs;

Clubs.propTypes = {
  data: PropTypes.node.isRequired,
};
