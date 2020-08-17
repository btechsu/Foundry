import * as actions from '@actions/actionTypes';
import { act } from 'react-dom/test-utils';

const initialState = {
  modalType: null,
  modalProps: {},
  isOpen: false,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case actions.SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
        isOpen: true,
      };
    case actions.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}