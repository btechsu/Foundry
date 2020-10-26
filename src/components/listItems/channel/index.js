import * as React from 'react';
import {
  ChannelContainer,
  ChannelNameLink,
  ChannelName,
  ChannelActions,
} from './style';

class ChannelListItem extends React.Component {
  render() {
    const { channel, id, children } = this.props;

    return (
      <ChannelContainer>
        <ChannelNameLink to={`/${id}/${channel.id}`}>
          <ChannelName>{channel.name}</ChannelName>
        </ChannelNameLink>

        {children && <ChannelActions>{children}</ChannelActions>}
      </ChannelContainer>
    );
  }
}

export default ChannelListItem;
