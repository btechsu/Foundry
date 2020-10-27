import * as React from 'react';
import styled from 'styled-components';
import compose from 'recompose/compose';
import { useInView } from 'react-intersection-observer';
import { useFirestore } from 'react-redux-firebase';
import {
  ListWithTitle,
  ListWrapper,
  ProfileCardWrapper,
} from 'src/views/clubs/style';
import { ErrorBoundary } from 'src/components/error';
import { Loading } from 'src/components/loading';
import { ErrorView } from 'src/views/viewHelpers';
import { ClubCard } from 'src/components/entities';

const List = () => {
  const [lastClub, setLastClub] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [clubs, setClubs] = React.useState([]);
  const [err, setErr] = React.useState(null);

  const firestore = useFirestore();

  const { ref, inView } = useInView();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const queryClubs = await firestore
          .collection('clubSubmissions')
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
                <ClubCard
                  club={club.data()}
                  id={club.id}
                  adminFeatures={true}
                />
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

export const SubmissionList = compose()(List);
