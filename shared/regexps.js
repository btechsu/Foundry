module.exports.URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/gi;
module.exports.RELATIVE_URL = /^\/([^\/].*|$)/g;
module.exports.FOUNDRY_URLS = /(?:(?:https?:\/\/)?|\B)(?:bths\.social|localhost:3000)(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/gi;