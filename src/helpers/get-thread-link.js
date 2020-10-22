import slugg from 'slugg';

const getThreadLink = (thread) => {
  if (!thread.community || !thread.channel) return `/thread/${thread.id}`;
  return `/${thread.community.slug}/${thread.channel.slug}/${slugg(
    thread.content.title,
  )}~${thread.id}`;
};

export default getThreadLink;
