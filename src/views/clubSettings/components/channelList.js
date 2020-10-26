import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { openModal } from 'src/actions/modals';
import { Loading } from 'src/components/loading';
import { OutlineButton } from 'src/components/button';
import Icon from 'src/components/icon';
import ViewError from 'src/components/viewError';
import Tooltip from 'src/components/tooltip';
import { ListContainer } from '../style';
import { firestoreConnect } from 'react-redux-firebase';
import {
  SectionCard,
  SectionTitle,
  SectionCardFooter,
} from 'src/components/settingsViews/style';
import { ChannelListItem } from 'src/components/listItems';

const ChannelList = (props) => {
  const { club, id, dispatch, firestore } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    firestore
      .collection('clubs')
      .doc(club.id || id)
      .collection('channels')
      .get()
      .then((channels) => {
        setIsLoading(false);
        setChannels(channels.docs);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  });

  if (club) {
    return (
      <SectionCard data-cy="channel-list">
        <SectionTitle>Channels</SectionTitle>

        <ListContainer style={{ padding: '0 16px' }}>
          {channels.length > 0 &&
            channels.map((channel) => {
              if (!channel) return null;
              return (
                <ChannelListItem
                  key={channel.id}
                  channel={channel.data()}
                  id={id}
                >
                  <Link to={`/${id}/${channel.id}/settings`}>
                    <Tooltip content={'Manage channel'}>
                      <span>
                        <Icon glyph="settings" />
                      </span>
                    </Tooltip>
                  </Link>
                </ChannelListItem>
              );
            })}
        </ListContainer>

        <SectionCardFooter>
          <OutlineButton
            style={{ alignSelf: 'flex-start' }}
            icon={'plus'}
            onClick={() =>
              dispatch(
                openModal('CREATE_CHANNEL_MODAL', {
                  id: id,
                }),
              )
            }
            data-cy="create-channel-button"
          >
            Create Channel
          </OutlineButton>
        </SectionCardFooter>
      </SectionCard>
    );
  }

  if (isLoading) {
    return (
      <SectionCard>
        <Loading />
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <ViewError
        refresh
        small
        heading={'We couldn’t load the channels for this community.'}
      />
    </SectionCard>
  );
};

export default compose(firestoreConnect(), connect())(ChannelList);
