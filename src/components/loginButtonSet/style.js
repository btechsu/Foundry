// @flow
import { theme } from '@shared/theme';
import styled from 'styled-components';
import { zIndex } from '@components/globals';
import { MEDIA_BREAK } from '@components/layout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px 0;
  @media (min-width: ${MEDIA_BREAK}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SigninButton = styled.button`
  display: flex;
  flex: 1;
  z-index: ${zIndex.card + 1};
  flex-direction: flex-row;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-start;
  color: ${theme.text.reverse};
  border-radius: 32px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 600;
  position: relative;
  width: 100%;
  user-select: none;
  cursor: pointer;
  ${(props) => props.showAfter && `margin-top: 32px`};
  ${(props) =>
    props.showAfter &&
    `
    &:after {
        content: 'Previously signed in with';
        position: absolute;
        top: -32px;
        font-size: 14px;
        font-weight: 600;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;
        color: ${props.theme.text.alt};
      }
    `} svg {
    fill: currentColor !important;
  }
  :disabled {
    cursor: default;
  }
`;

export const Label = styled.span`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  margin-top: -1px;
  margin-left: 8px;
  line-height: 2.45;
  word-break: keep-all;
  white-space: nowrap;
  color: currentColor;
`;

export const GoogleButton = styled(SigninButton)`
  background: ${(props) =>
    props.preferred ? props.theme.social.google.default : 'none'};
  color: ${(props) =>
    props.preferred ? '#fff' : props.theme.social.google.default};
  &:after {
    color: ${theme.social.google.default};
  }
`;