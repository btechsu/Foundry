export const isViewingMarketingPage = (history, currentUser) => {
  const viewing = history.location.pathname;
  const isRoot = viewing === '/';

  if (isRoot && (!currentUser || !currentUser.id)) return true;

  return (
    viewing === '/home' ||
    viewing === '/about' ||
    viewing === '/contact' ||
    viewing === '/privacy' ||
    viewing === '/privacy.html' ||
    viewing === '/support' ||
    viewing === '/terms' ||
    viewing === '/terms.html' ||
    viewing === '/faq' ||
    viewing === '/features'
  );
};
