import React from 'react';
import { SidebarSection } from 'src/views/club/style';
import { ChannelsList } from 'src/views/club/components/channelsList';
import { ClubCard } from 'src/components/entities';
import { ErrorBoundary } from 'src/components/error';

export default ({ club, id }) => (
  <React.Fragment>
    <SidebarSection>
      <ClubCard club={club} id={club.id || id} />
    </SidebarSection>

    <ErrorBoundary>
      <SidebarSection>
        <ChannelsList club={club} id={club.id || id} />
      </SidebarSection>
    </ErrorBoundary>
  </React.Fragment>
);
