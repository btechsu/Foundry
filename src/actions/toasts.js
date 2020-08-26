// @flow
import * as actions from './actionTypes';

const addToast = (id, kind, message, timeout) => {
  return {
    type: actions.ADD_TOAST,
    payload: {
      id,
      kind,
      message,
      timeout,
    },
  };
};

const removeToast = (id) => {
  return { type: actions.REMOVE_TOAST, id };
};

let nextToastId = 0;
export const addToastWithTimeout = (kind, message) => (dispatch) => {
  let timeout = 6000;
  if (kind === 'success') timeout = 3000;
  if (kind === 'notification') timeout = 5000;

  let id = nextToastId++;
  dispatch(addToast(id, kind, message, timeout));

  setTimeout(() => {
    dispatch(removeToast(id));
    id = nextToastId--;
  }, timeout);
};
