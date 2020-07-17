import React from 'react';
import PropTypes from 'prop-types';

// styles
import styled from 'styled-components';
import { ClickableCard, mixins, theme, media } from '@styles';
import { FormattedIcon } from '@components/icons';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 6;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
`;
const StyledCard = styled(ClickableCard)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body';
  grid-gap: 0.5rem;
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
const BodyIcons = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 5rem 1fr;
`;
const BodyIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    height: 1.7rem;
    width: 1.7rem;
    margin-right: 0.2rem;
    color: var(--color-gray-700);
  }

  .smaller {
    height: 1.4rem;
    width: 1.4rem;
  }
`;
const BodySmallText = styled.p`
  color: var(--color-gray-700);
  font-size: ${fontSizes.md};
  margin: 0;
  text-transform: capitalize;
`;
const BodyText = styled.p`
  ${mixins.normalText};
`;

const ClubCard = ({ to, title, text, room, time, type }) => {
  return (
    <GridWrapper>
      <StyledCard to={to}>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              {title} {type && <HeaderClubType>{type}</HeaderClubType>}
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        <BodyWrapper>
          <BodyIcons>
            {room && (
              <BodyIconWrapper>
                <FormattedIcon name="room" />
                <BodySmallText>{room}</BodySmallText>
              </BodyIconWrapper>
            )}
            {time && (
              <BodyIconWrapper>
                <FormattedIcon name="clock" />
                <BodySmallText>{time}</BodySmallText>
              </BodyIconWrapper>
            )}
          </BodyIcons>
          <BodyText>{text}</BodyText>
        </BodyWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default ClubCard;

ClubCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
