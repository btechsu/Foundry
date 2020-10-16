/**
 * This file is shared between server and client.
 * ⚠️ DON'T PUT ANY NODE.JS OR BROWSER-SPECIFIC CODE IN HERE ⚠️
 *
 * Note: This uses Flow comment syntax so this whole file is actually valid JS without any transpilation
 * The reason I did that is because create-react-app doesn't transpile files outside the source folder,
 * so it chokes on the Flow syntax.
 * More info: https://flow.org/en/docs/types/comments/
 */
var truncate = require('./truncate');
var striptags = require('striptags');

var DEFAULT_META = {
  title: 'Foundry',
  description: 'Your one stop shop for all Brooklyn Tech.',
};

var HIDE_FROM_CRAWLERS = '<meta name="robots" content="noindex, nofollow">';

/*::
type MaybeMeta = {
  title?: string,
  description?: string,
  extra?: string,
};
type Meta = {
  title: string,
  description: string,
  extra: string,
};
type OtherInput = {
  type?: string,
  data?: void,
};
type ThreadInput = {
  type: 'thread',
  data?: { title: string, body?: ?string, communityName?: string, privateChannel?: ?boolean type?: ?string },
};
type UserInput = {
  type: 'user',
  data?: { name: string, username: string, description?: string },
};
type ChannelInput = {
  type: 'channel',
  data?: { name: string, description?: string, communityName?: string, private?: ?boolean },
};
type CommunityInput = {
  type: 'community',
  data?: { name: string, description?: string },
};
type DirectMessageInput = {
  type: 'directMessage',
  data?: { title: string, description?: string },
};
type Input =
  | ThreadInput
  | UserInput
  | ChannelInput
  | CommunityInput
  | OtherInput;
*/

function setDefault(input /*: MaybeMeta */) /*: Meta */ {
  var title = input.title || DEFAULT_META.title;
  var description = input.description || DEFAULT_META.description;
  // If theres a custom title but no custom description
  // prefix "On Foundry" to the description
  // Otherwise you end up with "SpecFM | Where communities live"
  if (input.title && !input.description) {
    description = 'on Foundry, ' + DEFAULT_META.description.toLowerCase();
  }
  return {
    title: title,
    description: cleanDescription(description),
    extra: input.extra || '',
  };
}

function cleanDescription(input /*: string */) /*: string */ {
  return truncate(striptags(input), 160);
}

function generateMetaInfo(input /*: Input */) /*: Meta */ {
  var exists = input || {};
  var type = exists.type;
  var data = exists.data;
  switch (type) {
    case 'clubs': {
      return {
        title: 'Clubs',
        description: 'Explore clubs on Foundry',
      };
    }
    case 'user': {
      return setDefault({
        title: data && data.name + ' · @' + data.username,
        description: data && data.description,
      });
    }
    case 'club': {
      return setDefault({
        title: data && data.name,
        description: data && data.description,
      });
    }
    case 'notifications': {
      return setDefault({
        title: 'Notifications',
        description: 'Notifications on Foundry',
      });
    }
    default: {
      return DEFAULT_META;
    }
  }
}

module.exports = generateMetaInfo;
