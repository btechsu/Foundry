import * as React from 'react';
import { Wrapper } from '../style';
import {
  ContentContainer,
  Heading,
  Copy,
  Section,
  SectionTitle,
  SectionDescription,
} from './style';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Head from 'src/components/head';

class Terms extends React.Component {
  render() {
    return (
      <Wrapper data-cy="privacy-page">
        <Head title={'Foundry · Terms'} />

        <ContentContainer>
          <Heading>Privacy Policy</Heading>

          <Copy>Last updated October 14, 2020</Copy>

          <Section>
            <SectionDescription>
              At Foundry, accessible from https://bths.social, one of our main
              priorities is the privacy of our visitors. This Privacy Policy
              document contains types of information that is collected and
              recorded by Foundry and how we use it.
            </SectionDescription>

            <SectionDescription>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us.
            </SectionDescription>
          </Section>

          <Section>
            <SectionTitle>Log Files</SectionTitle>

            <SectionDescription>
              Foundry follows a standard procedure of using log files. These
              files log visitors when they visit websites. All hosting companies
              do this and a part of hosting services' analytics. The information
              collected by log files include internet protocol (IP) addresses,
              browser type, Internet Service Provider (ISP), date and time
              stamp, referring/exit pages, and possibly the number of clicks.
              These are not linked to any information that is personally
              identifiable. The purpose of the information is for analyzing
              trends, administering the site, tracking users' movement on the
              website, and gathering demographic information.
            </SectionDescription>
          </Section>

          <Section>
            <SectionTitle>Cookies and Web Beacons</SectionTitle>

            <SectionDescription>
              Like any other website, Foundry uses 'cookies'. These cookies are
              used to store information including visitors' preferences, and the
              pages on the website that the visitor accessed or visited. The
              information is used to optimize the users' experience by
              customizing our web page content based on visitors' browser type
              and/or other information.
            </SectionDescription>

            <SectionDescription>
              For more general information on cookies, please read the "What Are
              Cookies" article on{' '}
              <a href="https://www.cookieconsent.com/what-are-cookies/">
                Cookie Consent website
              </a>
              .
            </SectionDescription>
          </Section>

          <Section>
            <SectionTitle>Privacy Policies</SectionTitle>

            <SectionDescription>
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of Foundry.
            </SectionDescription>

            <SectionDescription>
              Third-party ad servers or ad networks uses technologies like
              cookies, JavaScript, or Web Beacons that are used in their
              respective advertisements and links that appear on Foundry, which
              are sent directly to users' browser. They automatically receive
              your IP address when this occurs. These technologies are used to
              measure the effectiveness of their advertising campaigns and/or to
              personalize the advertising content that you see on websites that
              you visit.
            </SectionDescription>

            <SectionDescription>
              Note that Foundry has no access to or control over these cookies
              that are used by third-party advertisers.
            </SectionDescription>
          </Section>

          <Section>
            <SectionTitle>Third Party Privacy Policies</SectionTitle>

            <SectionDescription>
              Foundry's Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about
              how to opt-out of certain options.{' '}
            </SectionDescription>

            <SectionDescription>
              You can choose to disable cookies through your individual browser
              options. To know more detailed information about cookie management
              with specific web browsers, it can be found at the browsers'
              respective websites. What Are Cookies?
            </SectionDescription>
          </Section>

          <Section>
            <SectionTitle>Children's Information</SectionTitle>

            <SectionDescription>
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity.
            </SectionDescription>

            <SectionDescription>
              Foundry does not knowingly collect any Personal Identifiable
              Information from children under the age of 13. If you think that
              your child provided this kind of information on our website, we
              strongly encourage you to contact us immediately and we will do
              our best efforts to promptly remove such information from our
              records.
            </SectionDescription>
          </Section>

          <Section>
            <SectionTitle>Online Privacy Policy Only</SectionTitle>

            <SectionDescription>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in Foundry. This policy is not
              applicable to any information collected offline or via channels
              other than this website.
            </SectionDescription>
          </Section>

          <Section>
            <SectionTitle>Consent</SectionTitle>

            <SectionDescription>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its Terms and Conditions.
            </SectionDescription>
          </Section>
        </ContentContainer>
      </Wrapper>
    );
  }
}

export default compose(withRouter, connect())(Terms);
