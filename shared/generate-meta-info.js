var truncate = require('./truncate');
var striptags = require('striptags');

var DEFAULT_META = {
  title: 'Foundry',
  description: 'Your one stop shop for all Brooklyn Tech.',
};

var HIDE_FROM_CRAWLERS = '<meta name="robots" content="noindex, nofollow">';

function setDefault(input /*: MaybeMeta */) /*: Meta */ {
  var title = input.title || DEFAULT_META.title;
  var description = input.description || DEFAULT_META.description;
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
    case 'channel': {
      return setDefault({
        title: data && data.clubName + ' · ' + data.name,
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
