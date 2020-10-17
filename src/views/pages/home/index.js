import * as React from 'react';
import { Overview, Centralized } from '../view';
import PageFooter from '../components/footer';
import { Wrapper } from '../style';

const Splash = () => {
  return (
    <Wrapper data-cy="home-page">
      <Overview />
      <Centralized />
      <PageFooter />
    </Wrapper>
  );
};

export default Splash;
