import * as React from 'react';
import Icon from 'src/components/icon';
import { NullColumn, NullColumnHeading, NullColumnSubheading } from './style';

const NullState = ({ viewContext, isSearch, clubId, channelId }) => {
  let hd;
  let cp;

  if (viewContext && viewContext === 'clubProfile') {
    hd = 'Start a conversation';
    cp =
      "There are no posts for this channel. If you're an admin, feel free to share something!";
  }

  if (viewContext && viewContext === 'channelProfile') {
    hd = 'There’s nothing in this channel yet';
    cp = 'But you could be the first person to post something here!';
  }

  if (isSearch) {
    hd = 'We didn’t find any relevant posts...';
    cp = 'Try searching again or create a new post';
  }

  const headingIcon = (clubId || channelId) && (
    <Icon glyph={'post'} size={44} />
  );

  return (
    <NullColumn>
      <span>
        {headingIcon && headingIcon}
        {hd && <NullColumnHeading>{hd}</NullColumnHeading>}
        {cp && <NullColumnSubheading>{cp}</NullColumnSubheading>}
      </span>
    </NullColumn>
  );
};

export default NullState;
