import React, { Component } from 'react';
import { Link } from 'gatsby';

// search
import algoliasearch from 'algoliasearch/lite';
import {
  Pagination,
  connectHits,
  Configure,
  InstantSearch,
} from 'react-instantsearch-dom';

// styles
import styled from 'styled-components';
import { theme, mixins, Card, GridCol, PaginationWrapper } from '@styles';
import { FormattedIcon } from '@components/icons';
import ShareIcon from '@images/other/share.svg';

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
  grid-template-columns: 1fr auto;
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
  align-items: center;
  justify-content: center;
`;
const RefreshIcon = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  svg {
    color: var(--color-text);
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
  }
`;

const NothingToSeeYet = () => (
  <BodyWrapper>
    <img src={ShareIcon} alt="Polls" className="invertIcon" />
    <BodyTitle>Nothing to see yet.</BodyTitle>
    <BodyText>When someone submits a club, it will show up here.</BodyText>
  </BodyWrapper>
);

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH
);

const Hits = ({ hits }) => {
  return (
    <>
      {hits.length === 0 && <NothingToSeeYet />}
      {hits.length !== 0 &&
        hits.map((hit, i) => (
          <ListItem key={i}>
            <ListHeader>
              <ListClubName to={`/app/admin/clubs/${hit.objectID}`}>
                {hit.name}{' '}
              </ListClubName>{' '}
              <StyledBadge>{hit.type}</StyledBadge>
            </ListHeader>
            <BodyIcons>
              <BodyIconWrapper>
                <FormattedIcon name="room" />
                <BodySmallText>{hit.room}</BodySmallText>
              </BodyIconWrapper>
              <BodyIconWrapper>
                <FormattedIcon name="clock" />
                <BodySmallText>{`${hit.days} @ ${hit.time}`}</BodySmallText>
              </BodyIconWrapper>
            </BodyIcons>
          </ListItem>
        ))}
    </>
  );
};
const CustomHits = connectHits(Hits);

class ClubCard extends Component {
  state = {
    refresh: false,
  };

  refresh = () => {
    this.setState({ refresh: true }, () => {
      this.setState({ refresh: false });
    });
  };

  render() {
    return (
      <GridCol spans={5} tabletSpans={6}>
        <StyledCard>
          <HeaderWrapper>
            <HeaderItems>
              <HeaderText>
                <span role="img" aria-label="">
                  📌
                </span>{' '}
                Club submissions
              </HeaderText>
              <RefreshIcon onClick={this.refresh}>
                <FormattedIcon name="sync" />
              </RefreshIcon>
            </HeaderItems>
          </HeaderWrapper>
          <InstantSearch
            indexName="clubSubmissions"
            searchClient={searchClient}
            refresh={this.state.refresh}
          >
            <Configure hitsPerPage={5} />
            <ListBodyWrapper>
              <CustomHits />
            </ListBodyWrapper>
            <FooterWrapper>
              <PaginationWrapper mt="0">
                <Pagination />
              </PaginationWrapper>
            </FooterWrapper>
          </InstantSearch>
        </StyledCard>
      </GridCol>
    );
  }
}

export default ClubCard;
