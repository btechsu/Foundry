import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Elements } from 'prismic-reactjs';
import SignupForm from './form';

// styles
import styled from 'styled-components';
import { mixins, media, theme } from '@styles';

const { fontSizes } = theme;

const MainContainer = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
`;
const ResponsiveWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
const LeftCol = styled.div`
  img {
    width: 100%;
  }

  display: flex;
  flex: 1 0 50%;
  position: relative;
  overflow: hidden;
  max-width: 80rem;
  ${media.tablet`display: none;`};
`;
const RightCol = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
  padding-bottom: 4rem;
  flex: 1 0 50%;
`;
const StyledHeader = styled.h2`
  color: var(--color-text);
  font-size: ${fontSizes.xl};
  margin-bottom: 2rem;
  font-weight: var(--font-weight-bold);
`;
const FormWrapper = styled.div`
  p {
    font-size: ${fontSizes.sm};
    color: var(--color-gray-700);
    margin-top: 0;
    margin-bottom: 1rem;
  }

  a {
    ${mixins.inlineLink}
  }
`;

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};
const sectionSerializer = function (type, element, content, children, key) {
  var props = {};
  switch (type) {
    case Elements.heading2:
      return React.createElement(
        StyledHeader,
        propsWithUniqueKey(props, key),
        children
      );
    default:
      return null;
  }
};

const Signup = ({ data }) => {
  return (
    <MainContainer>
      <ResponsiveWrapper>
        <LeftCol>
          <img src={data.image.url} alt={data.image.alt} />
        </LeftCol>
        <RightCol>
          <FormWrapper>
            <RichText render={data.title} htmlSerializer={sectionSerializer} />
            <SignupForm tos={data.label} />
          </FormWrapper>
        </RightCol>
      </ResponsiveWrapper>
    </MainContainer>
  );
};

export default Signup;

Signup.propTypes = {
  data: PropTypes.object.isRequired,
};
