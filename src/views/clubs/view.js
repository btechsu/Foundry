// @flow
import * as React from 'react';
import styled from 'styled-components';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { isLoaded, firestoreConnect } from 'react-redux-firebase';
import {
  ListWithTitle,
  ListWrapper,
  Collections,
  CollectionWrapper,
  ProfileCardWrapper,
} from './style';
import { SegmentedControl, Segment } from '@components/segmentedControl';
import { ErrorBoundary } from '@components/error';
import { Loading } from '@components/loading';
import { ErrorView } from '@views/viewHelpers';
import { ClubCard } from '@components/entities';

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
    selectedView: 'social',
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
        title: 'Social clubs',
        curatedContentType: 'social',
      },
      {
        title: 'STEM clubs',
        curatedContentType: 'stem',
      },
      {
        title: 'Volunteering clubs',
        curatedContentType: 'volunteering',
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
  const { slugs, clubs } = props;
  // useFirestoreConnect([
  //   { collection: 'clubs', where: ['type', '==', 'social'], storeAs: slugs },
  // ]);
  // const clubs = useSelector((state) => state.firestore.ordered.clubs);

  if (clubs.social && clubs.stem && clubs.volunteering) {
    return (
      <ListWithTitle>
        <ListWrapper>
          {slugs === 'social' && (
            <React.Fragment>
              {clubs.social.map((club, i) => (
                <ErrorBoundary key={i}>
                  <ProfileCardWrapper>
                    <ClubCard
                      club={{
                        name: club.name,
                        id: club.id,
                        description: club.description,
                        metaData: {
                          room: club.room,
                          time: `${club.days} @ ${club.time}`,
                        },
                      }}
                    />
                  </ProfileCardWrapper>
                </ErrorBoundary>
              ))}
            </React.Fragment>
          )}
          {slugs === 'stem' && (
            <React.Fragment>
              {clubs.stem.map((club, i) => (
                <ErrorBoundary key={i}>
                  <ProfileCardWrapper>
                    <ClubCard
                      club={{
                        name: club.name,
                        id: club.id,
                        description: club.description,
                        metaData: {
                          room: club.room,
                          time: `${club.days} @ ${club.time}`,
                        },
                      }}
                    />
                  </ProfileCardWrapper>
                </ErrorBoundary>
              ))}
            </React.Fragment>
          )}
          {slugs === 'volunteering' && (
            <React.Fragment>
              {clubs.volunteering.map((club, i) => (
                <ErrorBoundary key={i}>
                  <ProfileCardWrapper>
                    <ClubCard
                      club={{
                        name: club.name,
                        id: club.id,
                        description: club.description,
                        metaData: {
                          room: club.room,
                          time: `${club.days} @ ${club.time}`,
                        },
                      }}
                    />
                  </ProfileCardWrapper>
                </ErrorBoundary>
              ))}
            </React.Fragment>
          )}
        </ListWrapper>
      </ListWithTitle>
    );
  }
  if (
    !isLoaded(clubs.social) ||
    !isLoaded(clubs.stem) ||
    !isLoaded(clubs.volunteering)
  ) {
    return <Loading style={{ padding: '64px 32px', minHeight: '100vh' }} />;
  }

  return <ErrorView />;
};

export const Category = compose(
  firestoreConnect(() => [
    { collection: 'clubs', where: ['type', '==', 'social'], storeAs: 'social' },
    { collection: 'clubs', where: ['type', '==', 'stem'], storeAs: 'stem' },
    {
      collection: 'clubs',
      where: ['type', '==', 'volunteering'],
      storeAs: 'volunteering',
    },
  ]),
  connect((state, props) => {
    return { clubs: state.firestore.ordered };
  }),
)(CategoryList);
