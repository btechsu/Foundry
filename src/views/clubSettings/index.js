import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Head from 'src/components/head';
import Header from 'src/components/settingsViews/header';
import { SegmentedControl, Segment } from 'src/components/segmentedControl';
import { View } from './style';
import { ErrorView, LoadingView } from 'src/views/viewHelpers';
import { ViewGrid } from 'src/components/layout';
import { setTitlebarProps } from 'src/actions/titlebar';
import { firestoreConnect } from 'react-redux-firebase';
import { isAdmin } from 'src/helpers/permissions';
import Members from '../clubMembers';
import Overview from './components/overview';

const ClubSettings = (props) => {
  const { dispatch, location, match, auth, history, firestore } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [club, setClub] = useState(null);

  useEffect(() => {
    dispatch(
      setTitlebarProps({
        title: 'Settings',
      }),
    );
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const query = await firestore
          .collection('clubs')
          .doc(match.params.clubSlug)
          .get();

        if (!query.exists) {
          setError(true);
          setLoading(false);
        } else {
          setClub(query);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }

    fetchData();
    return;
  }, [match.params.clubSlug]);

  // this is hacky, but will tell us if we're viewing analytics or the root settings view
  const pathname = location.pathname;
  const lastIndex = pathname.lastIndexOf('/');
  const activeTab = pathname.substr(lastIndex + 1);

  if (club && auth.uid) {
    if (!isAdmin(club.data(), auth.uid)) {
      return <ErrorView />;
    }

    const subnavItems = [
      {
        to: `/${club.id}/settings`,
        label: 'Overview',
        activeLabel: 'settings',
      },
      {
        to: `/${club.id}/settings/members`,
        label: 'Members',
        activeLabel: 'members',
      },
    ];

    const subheading = {
      to: `/${club.id}`,
      label: `Return to ${club.data().name}`,
    };

    const avatar = {
      profilePhoto: club.data().pfp,
      club,
    };

    let title = club.data().name + ' settings';

    return (
      <React.Fragment>
        <Head title={title} />

        <ViewGrid>
          <View data-cy="community-settings">
            <Header
              avatar={avatar}
              subheading={subheading}
              heading={'Settings'}
            />

            <SegmentedControl>
              {subnavItems.map((item) => (
                <Segment
                  key={item.label}
                  to={item.to}
                  isActive={activeTab === item.activeLabel}
                >
                  {item.label}
                </Segment>
              ))}
            </SegmentedControl>

            <Switch>
              <Route path={`${match.url}/members`}>
                {() => (
                  <Members club={club.data()} id={club.id} history={history} />
                )}
              </Route>
              <Route path={`${match.url}`}>
                {() => <Overview club={club.data()} id={club.id} />}
              </Route>
            </Switch>
          </View>
        </ViewGrid>
      </React.Fragment>
    );
  }

  if (loading || !auth.isLoaded) {
    return <LoadingView />;
  }

  if (error) return <ErrorView />;

  return <ErrorView />;
};

export default compose(
  firestoreConnect(),
  withRouter,
  connect(({ firebase: { auth } }) => ({ auth })),
)(ClubSettings);
