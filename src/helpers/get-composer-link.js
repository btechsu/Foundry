import qs from 'query-string';

const getComposerLink = (props) => {
  const { clubId, channelId } = props;

  const search = {};
  if (clubId) search.composerClubId = clubId;
  if (channelId) search.composerChannelId = channelId;

  return {
    pathname: `/new/thread`,
    search: qs.stringify(search),
  };
};

export default getComposerLink;
