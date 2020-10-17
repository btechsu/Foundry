import * as actions from 'src/actions/actionTypes';

const initialState = {
  title: '',
  titleIcon: null,
  rightAction: null,
  leftAction: 'menu',
};

export default function titlebar(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_TITLEBAR_PROPS: {
      return Object.assign({}, state, {
        title: payload.title && payload.title,
        titleIcon: payload.titleIcon && payload.titleIcon,
        rightAction: payload.rightAction && payload.rightAction,
        leftAction: payload.leftAction || 'menu',
      });
    }
    default:
      return state;
  }
}
