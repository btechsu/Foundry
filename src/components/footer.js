import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { ROUTES, linkResolver } from '@utils';
import { RichText, Elements, Link as PrismicLink } from 'prismic-reactjs';

// styles
import styled from 'styled-components';
import { mixins, Container } from '@styles';

const FooterWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  background-color: var(--color-muted-background);
`;
const StyledFooter = styled.footer`
  display: block;
  text-align: center;

  p {
    ${mixins.regularText};
  }
`;
const StyledLink = styled.a`
  ${mixins.inlineLink};
`;
const PrivacyLink = styled(Link)`
  ${mixins.inlineLink};
`;

const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};
const sectionSerializer = function (type, element, content, children, key) {
  var props = {};
  switch (type) {
    case Elements.hyperlink:
      let result = '';
      const url = PrismicLink.url(element.data, linkResolver);
      if (element.data.link_type === 'Document') {
        result = (
          <Link to={url} key={key}>
            {content}
          </Link>
        );
      } else {
        const targetAttr = element.data.target
          ? { target: element.data.target }
          : {};
        const relAttr = element.data.target ? { rel: 'noopener' } : {};
        props = Object.assign(
          {
            href: element.data.url || linkResolver(element.data),
          },
          targetAttr,
          relAttr
        );
        result = React.createElement(
          StyledLink,
          propsWithUniqueKey(props, key),
          children
        );
      }
      return result;
    default:
      return null;
  }
};

const Footer = ({ data }) => {
  var d = new Date();
  var thisYear = d.getFullYear();
  const footerArray = data.footer[0];

  return (
    <FooterWrapper>
      <StyledFooter>
        <Container normal>
          <p>
            <span role="img" aria-label="Discover more.">
              🔭
            </span>{' '}
            The Foundry &copy; {thisYear} |{' '}
            <PrivacyLink to={ROUTES.PRIVACY}>Privacy Policy</PrivacyLink>
          </p>
          <RichText
            render={footerArray.text}
            htmlSerializer={sectionSerializer}
          />
        </Container>
      </StyledFooter>
    </FooterWrapper>
  );
};

export default Footer;

Footer.propTypes = {
  data: PropTypes.array.isRequired,
};
