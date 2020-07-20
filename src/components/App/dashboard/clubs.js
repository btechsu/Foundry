import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { ROUTES } from '@utils';
import { FirebaseContext } from '@Firebase';

// styles
import styled from 'styled-components';
import { theme, mixins, Card, GridCol } from '@styles';
import { FormattedIcon } from '@components/icons';
import ShareIcon from '@images/other/share.svg';
import { Circles } from '@components/loader';

const { fontSizes } = theme;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body' 'footer';
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
`;
const BodyWrapper = styled.div`
  grid-area: body;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-area: body;

  img {
    width: 90px;
    align-items: center;
    user-select: none;
    opacity: 0.3;
  }
`;
const ListBodyWrapper = styled.ul`
  grid-area: body;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  grid-area: body;

  li:nth-child(n + 2) {
    margin-top: 1.5rem;
  }
`;
const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;
const ListClubName = styled(Link)`
  color: var(--color-text);
  font-size: ${fontSizes.lg};
  margin: 0;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;
const StyledBadge = styled.span`
  color: var(--color-always-white);
  font-size: ${fontSizes.sm};
  text-transform: uppercase;
  background-color: var(--color-primary-shaded);
  padding: 0 0.5rem;
  margin-left: 0.5rem;
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
const BodyTitle = styled.h3`
  color: var(--color-text);
  font-size: ${fontSizes.lg};
  margin: 1rem 0;
  opacity: 0.5;
`;
const BodyText = styled.p`
  ${mixins.normalText};
  opacity: 0.5;
`;
const FooterWrapper = styled.div`
  grid-area: footer;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
const FooterButton = styled(Link)`
  ${mixins.inlineLink}

  svg {
    overflow: hidden;
    position: relative;
    top: 0.425rem;
    fill: currentcolor;
    height: 24;
    width: 24;
  }
`;

const NothingToSeeYet = () => (
  <BodyWrapper>
    <img src={ShareIcon} alt="Polls" className="invertIcon" />
    <BodyTitle>Nothing to see yet.</BodyTitle>
    <BodyText>
      Clubs you're in, have joined, or have applied for will show up here.
    </BodyText>
  </BodyWrapper>
);

const ClubCard = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <GridCol spans={5} tabletSpans={6}>
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              <span role="img" aria-label="">
                📌
              </span>{' '}
              My clubs
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        {!user && (
          <BodyWrapper>
            <Circles />
          </BodyWrapper>
        )}
        {!!user && user.clubs.length === 0 && <NothingToSeeYet />}
        {!!user && user.clubs.length !== 0 && (
          <ListBodyWrapper>
            {user.clubs.map((reference) => (
              <ListItem>
                <ListHeader>
                  <ListClubName to={`/club/${reference.ID}`}>
                    {reference.name}{' '}
                  </ListClubName>{' '}
                  <StyledBadge>{reference.status}</StyledBadge>
                </ListHeader>
                <BodyIcons>
                  <BodyIconWrapper>
                    <FormattedIcon name="room" />
                    <BodySmallText>{reference.room}</BodySmallText>
                  </BodyIconWrapper>
                  <BodyIconWrapper>
                    <FormattedIcon name="clock" />
                    <BodySmallText>{`${reference.days} @ ${reference.time}`}</BodySmallText>
                  </BodyIconWrapper>
                </BodyIcons>
              </ListItem>
            ))}
          </ListBodyWrapper>
        )}
        <FooterWrapper>
          <FooterButton to={ROUTES.CLUBS}>
            Browse clubs <FormattedIcon name="right-arrow" />
          </FooterButton>
        </FooterWrapper>
      </StyledCard>
    </GridCol>
  );
};

export default ClubCard;
