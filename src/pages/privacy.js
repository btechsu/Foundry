import React from 'react';
import Hero from '@components/hero';

// styles
import styled from 'styled-components';
import { Container, Section, theme, media } from '@styles';

const { fontSizes } = theme;

const PrivacyContainer = styled(Section)`
  margin-bottom: 5rem;
  color: var(--color-text);

  h1 {
    font-size: ${fontSizes.h1};
    ${media.tablet`font-size: ${fontSizes.xxl};`};
    font-weight: var(--font-weight-bold);
  }

  h2 {
    font-size: ${fontSizes.xxl};
    ${media.tablet`font-size: ${fontSizes.xl};`};
    font-weight: var(--font-weight-normal);
  }
  h3 {
    font-size: ${fontSizes.xl};
    ${media.tablet`font-size: ${fontSizes.lg};`};
    font-weight: var(--font-weight-normal);
  }
  p {
    font-size: ${fontSizes.md};
    font-weight: var(--font-weight-light);
  }
`;

export default () => {
  return (
    <>
      <Hero title="Privacy Policy" subtitle="Last updated: 06/06/20" />
      <PrivacyContainer>
        <Container normal>
          <h2>
            Your privacy is safe in our hands. We never use user data for
            malicious purposes.
          </h2>
          <p>
            It is Foundry's policy to respect your privacy regarding any
            information we may collect while operating our website. This Privacy
            Policy applies to bths.social (hereinafter, "us", or "we"). We
            respect your privacy and are committed to protecting personally
            identifiable information you may provide us through the Website. We
            have adopted this privacy policy ("Privacy Policy") to explain what
            information may be collected on our Website, how we use this
            information, and under what circumstances we may disclose the
            information to third parties. This Privacy Policy applies only to
            information we collect through the Website and does not apply to our
            collection of information from other sources.
          </p>
          <p>
            This Privacy Policy, together with the Terms and conditions posted
            on our Website, set forth the general rules and policies governing
            your use of our Website. Depending on your activities when visiting
            our Website, you may be required to agree to additional terms and
            conditions.
          </p>
          <h3>Website Visitors</h3>
          <p>
            Like most website operators, Foundry collects
            non-personally-identifying information of the sort that web browsers
            and servers typically make available, such as the browser type,
            language preference, referring site, and the date and time of each
            visitor request. Foundry's purpose in collecting non-personally
            identifying information is to better understand how Foundry's
            visitors use its website. From time to time, Foundry may release
            non-personally-identifying information in the aggregate, e.g., by
            publishing a report on trends in the usage of its website.
          </p>
          <p>
            Foundry also collects potentially personally-identifying information
            like Internet Protocol (IP) addresses for logged in users and for
            users leaving comments on bths.social blog posts. Foundry only
            discloses logged in user and commenter IP addresses under the same
            circumstances that it uses and discloses personally-identifying
            information as described below.
          </p>
          <h3>Gathering of Personally-Identifying Information</h3>
          <p>
            Certain visitors to Foundry's websites choose to interact with
            Foundry in ways that require Foundry to gather
            personally-identifying information. The amount and type of
            information that Foundry gathers depends on the nature of the
            interaction. For example, we ask visitors who sign up for a blog at
            bths.social to provide a username and email address.
          </p>
          <h3>Security</h3>
          <p>
            The security of your Personal Information is important to us, but
            remember that no method of transmission over the Internet, or method
            of electronic storage is 100% secure. While we strive to use
            commercially acceptable means to protect your Personal Information,
            we cannot guarantee its absolute security.
          </p>
          <h3>Advertisements</h3>
          <p>
            Ads appearing on our website may be delivered to users by
            advertising partners, who may set cookies. These cookies allow the
            ad server to recognize your computer each time they send you an
            online advertisement to compile information about you or others who
            use your computer. This information allows ad networks to, among
            other things, deliver targeted advertisements that they believe will
            be of most interest to you. This Privacy Policy covers the use of
            cookies by Foundry and does not cover the use of cookies by any
            advertisers.
          </p>
          <h3>Links To External Sites</h3>
          <p>
            Our Service may contain links to external sites that are not
            operated by us. If you click on a third party link, you will be
            directed to that third party's site. We strongly advise you to
            review the Privacy Policy and terms and conditions of every site you
            visit.
          </p>
          <p>
            We have no control over, and assume no responsibility for the
            content, privacy policies or practices of any third party sites,
            products or services.
          </p>
        </Container>
      </PrivacyContainer>
    </>
  );
};
