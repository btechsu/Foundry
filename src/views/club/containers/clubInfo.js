import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import generateMetaInfo from 'shared/generate-meta-info';
import Head from 'src/components/head';
import { ClubAvatar } from 'src/components/avatar';
import { MobileClubAction } from 'src/components/titlebar/actions';
import { setTitlebarProps } from 'src/actions/titlebar';
import { ClubFeeds } from '../components/clubFeeds';
import Sidebar from 'src/components/clubSidebar';
import {
  ViewGrid,
  SecondaryPrimaryColumnGrid,
  PrimaryColumn,
  SecondaryColumn,
} from 'src/components/layout';

const Component = (props) => {
  const { club, dispatch, location } = props;

  const [metaInfo, setMetaInfo] = useState(
    generateMetaInfo({
      type: 'club',
      data: {
        name: club.data().name,
        description: club.data().description,
      },
    }),
  );

  useEffect(() => {
    setMetaInfo(
      generateMetaInfo({
        type: 'club',
        data: {
          name: `${club.data().name || club.id}`,
          description: club.data().description,
        },
      }),
    );
    dispatch(
      setTitlebarProps({
        title: club.data().name,
        titleIcon: (
          <ClubAvatar isClickable={false} club={club.data()} size={24} />
        ),
        rightAction: <MobileClubAction club={club} id={club.id} />,
      }),
    );
  }, [club.id]);

  useEffect(() => {
    dispatch(
      setTitlebarProps({
        title: club.data().name,
        titleIcon: (
          <ClubAvatar isClickable={false} club={club.data()} size={24} />
        ),
        rightAction: <MobileClubAction club={club.data()} id={club.id} />,
      }),
    );
  }, [location]);

  const { title, description } = metaInfo;

  return (
    <React.Fragment>
      <Head title={title} description={description} image={club.data().pfp} />

      <ViewGrid data-cy="club-view">
        <SecondaryPrimaryColumnGrid>
          <SecondaryColumn>
            <Sidebar club={club.data()} id={club.id} />
          </SecondaryColumn>

          <PrimaryColumn>
            <ClubFeeds club={club.data()} id={club.id} />
          </PrimaryColumn>
        </SecondaryPrimaryColumnGrid>
      </ViewGrid>
    </React.Fragment>
  );
};

export const ClubInfo = compose(connect())(Component);
