// @flow
import * as React from 'react';
import styled from 'styled-components';
import compose from 'recompose/compose';
import { useInView } from 'react-intersection-observer';
import { useFirestore } from 'react-redux-firebase';
import {
  ListWithTitle,
  ListWrapper,
  Collections,
  CollectionWrapper,
  ProfileCardWrapper,
} from './style';
import { SegmentedControl, Segment } from 'src/components/segmentedControl';
import { ErrorBoundary } from 'src/components/error';
import { Loading } from 'src/components/loading';
import { ErrorView } from 'src/views/viewHelpers';
import { ClubCard } from 'src/components/entities';

const ChartGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const Charts = () => {
  return <ChartGrid>{<CollectionSwitcher />}</ChartGrid>;
};

class CollectionSwitcher extends React.Component {
  state = {
    selectedView: 'all',
  };

  parentRef = null;
  ref = null;

  componentDidMount() {
    this.parentRef = document.getElementById('main');
  }

  handleSegmentClick(selectedView) {
    if (this.state.selectedView === selectedView) return;

    return this.setState({ selectedView });
  }

  componentDidUpdate(prevProps, prevState) {
    const currState = this.state;
    if (prevState.selectedView !== currState.selectedView) {
      if (!this.parentRef || !this.ref) return;
      return (this.parentRef.scrollTop = this.ref.offsetTop);
    }
  }

  render() {
    const collections = [
      {
        title: 'All',
        curatedContentType: 'all',
      },
      {
        title: 'Social',
        curatedContentType: 'social',
      },
      {
        title: 'STEM',
        curatedContentType: 'stem',
      },
      {
        title: 'Volunteering',
        curatedContentType: 'volunteering',
      },
      {
        title: 'Acedemic',
        curatedContentType: 'acedemic',
      },
      {
        title: 'Publications',
        curatedContentType: 'publications',
      },
      {
        title: 'Sports',
        curatedContentType: 'sports',
      },
    ];

    return (
      <Collections ref={(el) => (this.ref = el)}>
        <SegmentedControl>
          {collections.map((collection, i) => (
            <Segment
              key={i}
              onClick={() =>
                this.handleSegmentClick(collection.curatedContentType)
              }
              isActive={
                collection.curatedContentType === this.state.selectedView
              }
            >
              {collection.title}
            </Segment>
          ))}
        </SegmentedControl>
        <CollectionWrapper>
          {collections.map((collection, i) => (
            <div key={i}>
              {collection.curatedContentType === this.state.selectedView && (
                <Category slugs={this.state.selectedView} />
              )}
            </div>
          ))}
        </CollectionWrapper>
      </Collections>
    );
  }
}

const CategoryList = (props) => {
  const { slugs } = props;
  const [lastClub, setLastClub] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [clubs, setClubs] = React.useState([]);
  const [err, setErr] = React.useState(null);

  const firestore = useFirestore();

  const { ref, inView } = useInView({ threshold: 0.8 });

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const queryClubs =
          slugs === 'all'
            ? await firestore
                .collection('clubs')
                .orderBy('name')
                .startAfter(lastClub)
                .limit(6)
                .get()
            : await firestore
                .collection('clubs')
                .where('type', '==', slugs)
                .orderBy('name')
                .startAfter(lastClub)
                .limit(6)
                .get();
        setClubs((prev) => [...prev, ...queryClubs.docs]);
        setLastClub(queryClubs.docs[queryClubs.docs.length - 1]);
        setIsLoading(false);
      } catch (err) {
        setErr(err);
        setIsLoading(false);
      }
    }

    if (inView) fetchData();

    return;
  }, [inView]);

  if (clubs.length >= 0)
    return (
      <ListWithTitle>
        <ListWrapper>
          <ErrorBoundary>
            {clubs.map((club, i) => (
              <ProfileCardWrapper key={i}>
                <ClubCard club={club.data()} id={club.id} />
              </ProfileCardWrapper>
            ))}
          </ErrorBoundary>
        </ListWrapper>
        <div ref={ref}>
          {isLoading && <Loading styles={{ padding: '100px 32px' }} />}
        </div>
      </ListWithTitle>
    );

  if (err) {
    return (
      <ErrorView
        heading="Oops, looks like we couldn't load the results"
        subheading={err.message ? err.message : err}
      />
    );
  }

  return <ErrorView />;
};

export const Category = compose()(CategoryList);
