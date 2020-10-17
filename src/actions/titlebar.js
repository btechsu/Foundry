import * as actions from './actionTypes';

export const setTitlebarProps = (payload) => {
  return {
    type: actions.SET_TITLEBAR_PROPS,
    payload,
  };
};
