// @flow
import * as actions from './actionTypes';

export const updateNotificationsCount = (countType, count) => ({
  type: actions.UPDATE_NOTIFICATIONS_BADGE_COUNT,
  countType,
  count,
});

export const setNotifications = (notifications) => ({
  type: actions.SET_NOTIFICATIONS,
  notifications,
});
