// @flow
import * as actions from './actionTypes';

export const openModal = (name, props) => {
  return {
    type: actions.SHOW_MODAL,
    modalType: name,
    modalProps: props || {},
  };
};

export const closeModal = () => ({
  type: actions.HIDE_MODAL,
});
