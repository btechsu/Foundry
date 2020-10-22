const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  recoverPassword: {
    error: null,
    loading: false,
  },
  profileEdit: {
    error: null,
    loading: false,
  },
  deleteUser: {
    loading: false,
    error: null,
  },
};

// HELPER FUNCTIONS

const authStart = (state) => {
  return { ...state, loading: true };
};

const authEnd = (state) => {
  return { ...state, loading: false };
};

const authFail = (state, payload) => {
  return { ...state, error: payload };
};

const authSuccess = (state) => {
  return { ...state, error: false };
};

const verifyStart = (state) => {
  return {
    ...state,
    verifyEmail: { ...state.verifyEmail, loading: true },
  };
};

const verifySuccess = (state) => {
  return {
    ...state,
    verifyEmail: { ...state.verifyEmail, loading: false, error: false },
  };
};

const verifyFail = (state, payload) => {
  return {
    ...state,
    verifyEmail: { ...state.verifyEmail, loading: false, error: payload },
  };
};

const recoveryStart = (state) => {
  return {
    ...state,
    recoverPassword: { ...state.recoverPassword, loading: true },
  };
};

const recoverySuccess = (state) => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: false,
    },
  };
};

const recoveryFail = (state, payload) => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: payload,
    },
  };
};

const cleanUp = (state) => {
  return {
    ...state,
    error: null,
    loading: false,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: null,
    },
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: null,
    },
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CLEAN_UP':
      return cleanUp(state);

    case 'AUTH_START':
      return authStart(state);

    case 'AUTH_END':
      return authEnd(state);

    case 'AUTH_FAIL':
      return authFail(state, payload);

    case 'AUTH_SUCCESS':
      return authSuccess(state);

    case 'VERIFY_START':
      return verifyStart(state);

    case 'VERIFY_SUCCESS':
      return verifySuccess(state);

    case 'VERIFY_FAIL':
      return verifyFail(state, payload);

    case 'RECOVERY_START':
      return recoveryStart(state);

    case 'RECOVERY_SUCCESS':
      return recoverySuccess(state);

    case 'RECOVERY_FAIL':
      return recoveryFail(state, payload);

    default:
      return state;
  }
};
