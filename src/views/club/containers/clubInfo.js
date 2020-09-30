import React from 'react';
import Head from 'src/components/head';
import { ClubAvatar } from 'src/components/avatar';
import { MobileCommunityAction } from 'src/components/titlebar/actions';
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

const ClubInfo = (club) => {
  return (
    <React.Fragment>
      <Head
      // title={title}
      // description={description}
      // image={club.profilePhoto}
      />

      <ViewGrid data-cy="club-view">
        <SecondaryPrimaryColumnGrid>
          <SecondaryColumn>
            <SidebarSection>
              {/* <ClubCard  /> */}
              {/* pass club doc here or just make another club card component if you dont like */}
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
