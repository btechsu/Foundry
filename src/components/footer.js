import React from 'react';
import { Link } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { mixins } from '@styles';

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

const Footer = () => {
  var d = new Date();
  var thisYear = d.getFullYear();

  return (
    <FooterWrapper>
      <StyledFooter>
        <p>
          <span role="img" aria-label="Discover more.">
            🔭
          </span>{' '}
          The Foundry &copy; {thisYear} |{' '}
          <PrivacyLink to={ROUTES.PRIVACY}>Privacy Policy</PrivacyLink>
        </p>
        <p>
          Created and designed by{' '}
          <StyledLink
            href={`https://kyryloorlov.com/?utm_source=foundry&utm_medium=footer&utm_campaign=link`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Kyrylo Orlov
          </StyledLink>{' '}
          and{' '}
          <StyledLink
            href="http://mattbilik.tech"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Matthew Bilik
          </StyledLink>
          .
        </p>
      </StyledFooter>
    </FooterWrapper>
  );
};

export default Footer;
