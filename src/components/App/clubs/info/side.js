import React from 'react';
import PropTypes from 'prop-types';

// styles
import styled from 'styled-components';
import {
  theme,
  media,
  mixins,
  Container,
  Card,
  ClickableButton,
} from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 4;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body' 'footer';
  grid-gap: 0.5rem;
  margin-top: 1rem;
`;
const JoinButton = styled(ClickableButton)`
  ${mixins.primaryButton};
  ${mixins.bigButton};
  width: 100%;
  margin-bottom: 1rem;
`;
const ContactButton = styled.a`
  text-align: center;
  padding: 0.375rem 1rem;
  ${mixins.secondaryButton};
  ${mixins.bigButton};
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-area: header;
`;
const HeaderItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
`;
const HeaderText = styled.h3`
  color: var(--color-text);
  margin: 0;
  font-size: ${fontSizes.xl};
  text-transform: capitalize;
`;
const HeaderClubType = styled.span`
  color: var(--color-always-white);
  font-size: ${fontSizes.xs};
  font-weight: inherit;
  text-transform: uppercase;
  background-color: var(--color-primary-shaded);
  padding: 0 0.5rem;
`;
const BodyWrapper = styled.div`
  grid-area: body;
`;
const BodyText = styled.p`
  ${mixins.normalText};
  margin: 0;
`;
const FooterWrapper = styled.div`
  grid-area: footer;
`;
const FooterIcons = styled.div`
  display: flex;
  flex-direction: column;
`;
const FooterIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;

  svg {
    height: 1.7rem;
    width: 1.7rem;
    margin-right: 0.4rem;
    color: var(--color-gray-700);
  }
`;
const FooterSmallText = styled.p`
  color: var(--color-gray-700);
  font-size: ${fontSizes.md};
  margin: 0;

  .transform {
    text-transform: capitalize;
  }
`;

const Side = ({ data }) => {
  return (
    <GridWrapper>
      <JoinButton>Request to join</JoinButton>
      <ContactButton
        target="_blank"
        rel="noopener"
        href={`mailto:${data.president}?subject=I have a question about ${data.name}`}
      >
        Contact administrator
      </ContactButton>
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              {data.name} <HeaderClubType>{data.type}</HeaderClubType>
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        <BodyWrapper>
          <BodyText>{data.description}</BodyText>
        </BodyWrapper>
        <FooterWrapper>
          <FooterIcons>
            {data.room && (
              <FooterIconWrapper>
                <FormattedIcon name="room" />
                <FooterSmallText className="transform">
                  {data.room}
                </FooterSmallText>
              </FooterIconWrapper>
            )}
            {data.time && (
              <FooterIconWrapper>
                <FormattedIcon name="clock" />
                <FooterSmallText className="transform">{`${data.days} @ ${data.time}`}</FooterSmallText>
              </FooterIconWrapper>
            )}
            {data.president && (
              <FooterIconWrapper>
                <FormattedIcon name="user" />
                <FooterSmallText>{data.president}</FooterSmallText>
              </FooterIconWrapper>
            )}
          </FooterIcons>
        </FooterWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default Side;

Side.propTypes = {
  data: PropTypes.object.isRequired,
};
