export const updateNotificationsCount = (countType, count) => ({
  type: 'UPDATE_NOTIFICATIONS_BADGE_COUNT',
  countType,
  count,
});

export const setNotifications = (notifications) => ({
  type: 'SET_NOTIFICATIONS',
  notifications,
});
