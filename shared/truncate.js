// Truncate a string nicely to a certain length
function truncate(str /*: string */, length /*: number */) {
  if (str.length <= length) {
    return str;
  }
  var subString = str.substr(0, length);

  // if the title doesn't have any spaces in it, just break at the normal length
  if (subString.indexOf(' ') < 0) return subString + '…';

  // if the title has a space character, attempt to break between words
  return (
    subString.substr(0, subString.lastIndexOf(' ')).replace(/\n/, ' ') + '…'
  );
}

module.exports = truncate;
