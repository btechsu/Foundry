import React from 'react';
import { Link } from 'react-router-dom';
import renderTextWithLinks from 'src/helpers/render-text-with-markdown-links';
import { MetaContainer, Name, Description, Username } from '../style';

export const ChannelMeta = (props) => {
  const { channel } = props;
  const { description, community } = channel;
  const formattedDescription = description && renderTextWithLinks(description);

  return (
    <MetaContainer style={{ marginTop: '20px' }}>
      <Link to={`/${community.slug}/${channel.slug}`}>
        <Name># {channel.name}</Name>
      </Link>

      {formattedDescription && (
        <Description>{formattedDescription}</Description>
      )}
    </MetaContainer>
  );
};