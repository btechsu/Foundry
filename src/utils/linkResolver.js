export const linkResolver = (doc) => {
  // URL for a category type
  if (doc.type === 'privacy') {
    return `/${doc.uid}`;
  }

  if (doc.type === 'about') {
    return `/${doc.uid}`;
  }

  return '/';
};
