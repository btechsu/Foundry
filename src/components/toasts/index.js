import React from 'react';
import { connect } from 'react-redux';
import {
  ToastsContainer,
  ErrorToast,
  SuccessToast,
  NeutralToast,
  NotificationToast,
} from './style';

const ToastsPure = ({ toasts }) => {
  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    <ToastsContainer>
      {toasts.map((toast) => {
        const { kind, timeout, message, id } = toast;
        switch (kind) {
          case 'error': {
            let cleanedMessage = message;
            return (
              <ErrorToast data-cy={'toast-error'} key={id} timeout={timeout}>
                {cleanedMessage}
              </ErrorToast>
            );
          }
          case 'success': {
            return (
              <SuccessToast
                data-cy={`toast-success`}
                key={id}
                timeout={timeout}
              >
                {message}
              </SuccessToast>
            );
          }
          case 'neutral': {
            return (
              <NeutralToast
                data-cy={`toast-neutral`}
                key={id}
                timeout={timeout}
              >
                {message}
              </NeutralToast>
            );
          }
          case 'notification': {
            return (
              <NotificationToast key={id} timeout={timeout}>
                {message}
              </NotificationToast>
            );
          }
          default: {
            return null;
          }
        }
      })}
    </ToastsContainer>
  );
};

const mapStateToProps = (state) => ({
  toasts: state.toasts.toasts,
});
export default connect(mapStateToProps)(ToastsPure);
