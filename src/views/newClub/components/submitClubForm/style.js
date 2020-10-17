import { theme } from 'shared/theme';
import styled, { css } from 'styled-components';
import { FlexCol, FlexRow, zIndex } from 'src/components/globals';
import { MEDIA_BREAK } from 'src/components/layout';
import { hexa } from 'src/components/globals';

export const DeleteCoverWrapper = styled(FlexRow)`
  justify-content: flex-end;
  flex-grow: 1;
  height: 0px;
`;

export const DeleteCoverButton = styled.button`
  position: relative;
  top: 7px;
  left: 10px;
  background-color: ${theme.text.placeholder};
  color: ${theme.text.reverse};
  border: none;
  border-radius: 50%;
  outline: none;
  padding: 4px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  z-index: 50;
  &:hover {
    background-color: ${theme.warn.alt};
  }
`;

export const ImageInputWrapper = styled(FlexCol)`
  position: relative;
  flex: 0 0 auto;
  margin-top: 8px;
  margin-bottom: 24px;
  > label:nth-of-type(2) {
    position: absolute;
    bottom: -24px;
    left: 16px;
  }
`;

export const Spacer = styled.div`
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  display: block;
`;

export const CommunitySuggestionsText = styled.p`
  margin: 16px 0px 8px;
  font-size: 14px;
  color: ${theme.text.default};
`;

export const CommunitySuggestionsWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 24px;
  width: 100%;
`;

export const CommunitySuggestion = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  background: ${theme.bg.wash};
  color: ${theme.text.alt};
  border-left: 1px solid ${theme.bg.border};
  border-right: 1px solid ${theme.bg.border};
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  strong {
    margin-left: 8px;
    margin-right: 8px;
    font-weight: 500;
  }
  &:hover {
    color: ${theme.text.default};
  }
  &:first-of-type {
    padding-top: 8px;
    border-top: 1px solid ${theme.bg.border};
  }
  &:last-of-type {
    padding-bottom: 8px;
    border-bottom: 1px solid ${theme.bg.border};
  }
`;

export const PrivacySelector = styled.div`
  display: flex;
  border-radius: 4px;
  border: 2px solid ${theme.bg.border};
  margin-top: 16px;
  overflow: hidden;
`;

export const PrivacyOption = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1 0 50%;
  padding: 16px;
  background: ${(props) =>
    props.selected ? props.theme.bg.default : props.theme.bg.wash};
  cursor: pointer;
  input {
    width: 18px;
    height: 18px;
    border-radius: 24px;
    border: 2px solid ${theme.bg.border};
  }
  input:checked {
    box-shadow: inset 0 0 0 4px ${theme.brand.alt};
    border: 2px solid ${theme.brand.alt};
  }
  ${(props) =>
    props.selected
      ? css`
          p {
            color: ${props.theme.text.default};
          }
        `
      : css`
          p {
            color: ${props.theme.text.alt};
          }
        `} &:first-of-type {
    border-right: 2px solid ${theme.bg.border};
  }
`;

export const PrivacyOptionLabel = styled.p`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  input {
    margin-right: 8px;
  }
`;

export const PrivacyOptionText = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
  line-height: 1.4;
`;

export const MetaWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 10px;

  @media (max-width: ${MEDIA_BREAK - 300}px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
  }
`;

const Selector = styled.select`
  display: inline-block;
  border: none;
  box-shadow: none;
  margin-top: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 14px;
  @media (max-width: ${MEDIA_BREAK}px) {
    flex: auto;
    font-size: 16px; /* has to be 16px to avoid zoom on iOS */
  }
`;

export const RequiredSelector = styled(Selector)`
  padding: 8px 12px;
  max-height: 38px;
  max-width: 212px;
  line-height: 1.2;
  border: 2px solid
    ${(props) =>
      props.disabled ? props.theme.bg.border : props.theme.bg.inactive};
  border-radius: 4px;
  color: ${(props) => (props.emphasize ? theme.brand.alt : theme.text.default)};
  background-color: ${(props) =>
    props.disabled ? theme.bg.wash : theme.bg.default};
  &:focus {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${theme.bg.default},
      0 0 0 4px ${hexa(theme.brand.alt, 0.24)};
  }
  &:active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${theme.bg.default},
      0 0 0 4px ${hexa(theme.brand.alt, 0.64)};
  }
`;

export const ThreadInputs = styled(FlexCol)`
  position: relative;
  padding: 32px;
  padding-bottom: 0;
  background-color: ${theme.bg.default};
  z-index: ${zIndex.composer};
  height: 100%;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 24px;
  }
`;

export const ThreadDescription = {
  fontSize: '16px', // has to be 16px to avoid zoom on iOS
  fontWeight: '400',
  width: '100%',
  display: 'inline-block',
  lineHeight: '1.4',
  outline: 'none',
  border: '0',
  boxShadow: 'none',
  color: '#16171A',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowY: 'scroll',
  position: 'relative',
  margin: '9px 0 25px 0',
};

export const InputHints = styled(FlexRow)`
  color: ${theme.text.alt};
  font-size: 14px;
`;

export const DesktopLink = styled.a`
  display: flex;
  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`;

export const Actions = styled.div`
  background: ${theme.bg.wash};
  border-top: 1px solid ${theme.bg.border};
  padding: 8px 16px;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  display: flex;
  flex: 1 0 auto;
  height: 56px;
  min-height: 56px;
  max-height: 56px;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 8px;
    z-index: ${zIndex.chrome + 1};
  }
`;
