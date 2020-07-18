import React from 'react';

// search
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Pagination,
  connectSearchBox,
  connectHits,
  Configure,
  connectRefinementList,
} from 'react-instantsearch-dom';

// styles
import styled from 'styled-components';
import { media, theme, Container } from '@styles';
import { FormattedIcon } from '@components/icons';

// components
import ClubCard from './ClubCard';
import Hero from './hero';
import Sort from './sort';

const { fontSizes } = theme;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const CardsContainer = styled.div`
  z-index: 1;
  margin: 3rem 0;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(11, minmax(0, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 3rem;
  align-items: flex-start;

  @media only screen and (min-width: 64rem) {
    grid-column-gap: 2rem;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  margin-top: 2rem;
  padding: 1.5rem;
  border: 2px solid var(--color-card);
  border-radius: 1.5rem;
  box-shadow: 0px 5px 9px var(--shadow);
  background-color: var(--color-card);
  font-size: ${fontSizes.lg};
  ${media.tablet`margin-top: 1rem;`};
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    color: var(--color-gray-700);
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-text);
  margin-left: 1rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: var(--color-gray-500);
  }

  ::-webkit-search-cancel-button {
    display: none;
  }
`;
const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
  }
  li {
    font-size: ${fontSizes.lg};
    padding: 0.4rem 0.9rem;
    margin: 0.2rem;
    color: var(--color-always-white);
    background-color: var(--color-secondary-shaded);
  }
  a {
    text-decoration: none;
    color: var(--color-always-white);
  }
`;
const CancelButton = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  display: ${(props) => (props.hide ? 'none' : 'relative')};

  :focus {
    outline: 0;
  }
`;
const CustomCheckbox = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: transparent;
  position: absolute;
  left: 0;
  top: 0;
  border: 2px solid var(--color-gray-700);
`;
const LabelWrapper = styled.label`
  display: inline-block;
  padding-left: 30px;
  position: relative;
  cursor: pointer;
  user-select: none;
  margin-bottom: 1rem;

  input {
    display: none;
  }

  input:checked + ${CustomCheckbox} {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
  }

  input:checked + ${CustomCheckbox}:after {
    content: '';
    position: absolute;
    height: 6px;
    width: 11px;
    border-left: 2px solid var(--color-always-white);
    border-bottom: 2px solid var(--color-always-white);
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
const RefinmentWrapper = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    color: var(--color-text);
    font-size: ${fontSizes.lg};
  }
`;
const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 8;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-column-gap: 0.5rem;
  grid-row-gap: 2rem;

  @media only screen and (min-width: 64rem) {
    grid-column-gap: 2rem;
  }
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
`;

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH
);

const SearchBox = ({ currentRefinement, refine }) => (
  <StyledForm
    noValidate
    action=""
    role="search"
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <FormattedIcon name="search" />
    <SearchInput
      type="search"
      placeholder="Search here…"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      required=""
      maxlength="512"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
    <CancelButton
      type="reset"
      onClick={() => refine('')}
      hide={currentRefinement === '' ? true : false}
    >
      <FormattedIcon name="cancel" />
    </CancelButton>
  </StyledForm>
);
const Hits = ({ hits }) => {
  return (
    <>
      {hits.map((hit) => (
        <ClubCard
          to={`/club/${hit.objectID}`}
          title={hit.name}
          text={hit.description}
          room={hit.room}
          time={`${hit.days} @ ${hit.time}`}
          type={hit.type}
        />
      ))}
    </>
  );
};
const RefinementList = ({ items, refine, createURL }) => (
  <RefinmentWrapper>
    <ul>
      {items.map((item) => (
        <li>
          <LabelWrapper
            key={item.label}
            onClick={(event) => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            <input type="checkbox" checked={item.isRefined} />
            <CustomCheckbox />
            {item.label} ({item.count})
          </LabelWrapper>
        </li>
      ))}
    </ul>
  </RefinmentWrapper>
);

const CustomHits = connectHits(Hits);
const CustomSearchBox = connectSearchBox(SearchBox);
const CustomRefinements = connectRefinementList(RefinementList);

const Dash = () => {
  return (
    <PageWrapper>
      <Container normal>
        <InstantSearch
          indexName="clubs"
          searchClient={searchClient}
          stalledSearchDelay={100}
        >
          <Configure hitsPerPage={8} />
          <Hero>
            <CustomSearchBox />
          </Hero>
          <CardsContainer>
            <CardGrid>
              <Sort>
                <CustomRefinements attribute="type" />
              </Sort>
              <GridWrapper>
                <CustomHits />
              </GridWrapper>
            </CardGrid>
            <PaginationWrapper>
              <Pagination />
            </PaginationWrapper>
          </CardsContainer>
        </InstantSearch>
      </Container>
    </PageWrapper>
  );
};

export default Dash;
