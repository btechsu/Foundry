import React, { useState } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { openModal } from 'src/actions/modals';
import { isAdmin } from 'src/helpers/permissions';
import Flyout from 'src/components/flyout';
import OutsideClickHandler from 'src/components/outsideClickHandler';
import Icon from 'src/components/icon';
import { TextButton } from 'src/components/button';
import { FlyoutRow, DropWrap, Label } from './style';

const ActionsDropdown = (props) => {
  const { thread, dispatch, club, id, channel, auth } = props;

  const shouldRenderDeleteThreadAction = isAdmin(club, auth.uid);

  const triggerDelete = (e) => {
    e.preventDefault();

    return dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        id: thread.id,
        club: id,
        channel: channel.id,
        entity: 'thread',
        message: 'Are you sure you want to delete this thread?',
        extraProps: {
          thread,
        },
      }),
    );
  };

  const [flyoutOpen, setFlyoutOpen] = useState(false);

  return (
    <DropWrap style={{ marginRight: '8px' }}>
      <Manager>
        <Reference>
          {({ ref }) => {
            return (
              <span ref={ref}>
                <Icon
                  glyph="settings"
                  onClick={() => setFlyoutOpen(!flyoutOpen)}
                  data-cy="thread-actions-dropdown-trigger"
                />
              </span>
            );
          }}
        </Reference>
        {flyoutOpen && (
          <OutsideClickHandler onOutsideClick={() => setFlyoutOpen(false)}>
            <Popper
              modifiers={{
                flip: {
                  boundariesElement: 'viewport',
                  behavior: ['top', 'bottom', 'top'],
                },
                hide: { enable: false },
              }}
            >
              {({ style, ref }) => {
                return (
                  <div
                    ref={ref}
                    style={{
                      position: 'relative',
                      right: '170px',
                      top: '-40px',
                    }}
                  >
                    <Flyout data-cy="thread-actions-dropdown" style={style}>
                      {shouldRenderDeleteThreadAction && (
                        <FlyoutRow>
                          <TextButton
                            onClick={triggerDelete}
                            data-cy={'thread-dropdown-delete'}
                          >
                            <Icon size={24} glyph={'delete'} />
                            <Label>Delete</Label>
                          </TextButton>
                        </FlyoutRow>
                      )}
                    </Flyout>
                  </div>
                );
              }}
            </Popper>
          </OutsideClickHandler>
        )}
      </Manager>
    </DropWrap>
  );
};

export default compose(connect(({ firebase: { auth } }) => ({ auth })))(
  ActionsDropdown,
);
