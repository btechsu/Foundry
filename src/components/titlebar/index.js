// @flow
import React from 'react';
import { theme } from '@shared/theme';
import BaseTitlebar from './base';

export const MobileTitlebar = (props) => (
  <BaseTitlebar
    style={{ borderBottom: `1px solid ${theme.bg.border}` }}
    {...props}
  />
);

export const DesktopTitlebar = (props) => (
  <BaseTitlebar
    desktop
    style={{
      borderBottom: `1px solid ${theme.bg.border}`,
      position: 'sticky',
      top: '0',
      zIndex: 9000,
      height: '62px',
      maxHeight: '62px',
    }}
    {...props}
  />
);
