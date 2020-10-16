import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import generateMetaInfo from 'shared/generate-meta-info';
import Head from 'src/components/head';
import { ClubAvatar } from 'src/components/avatar';
import { setTitlebarProps } from 'src/actions/titlebar';
import { ClubCard } from 'src/components/entities';
import { ErrorBoundary } from 'src/components/error';
import { SidebarSection } from '../style';
import {
  ViewGrid,
  SecondaryPrimaryColumnGrid,
  PrimaryColumn,
  SecondaryColumn,
} from 'src/components/layout';

const Component = (props) => {
  const { club } = props;

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
          name: `${club.data().name} club`,
          description: club.data().description,
        },
      }),
    );
  }, []);

  const { title, description } = metaInfo;

  return (
    <React.Fragment>
      <Head title={title} description={description} image={club.data().pfp} />

      <ViewGrid data-cy="club-view">
        <SecondaryPrimaryColumnGrid>
          <SecondaryColumn>
            <SidebarSection>
              <ClubCard club={club.data()} id={club.id} />
            </SidebarSection>
            <ErrorBoundary>
              <SidebarSection>
                {/* switch between info and announcements */}
              </SidebarSection>
            </ErrorBoundary>
          </SecondaryColumn>

          <PrimaryColumn>
            {/* the info and announcements are presented here */}
          </PrimaryColumn>
        </SecondaryPrimaryColumnGrid>
      </ViewGrid>
    </React.Fragment>
  );
};

export const ClubInfo = compose(connect())(Component);
