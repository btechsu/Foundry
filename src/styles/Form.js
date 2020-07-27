import styled from 'styled-components';
import theme from './theme';

const { fontSizes } = theme;

const FormGroup = styled.section`
  margin-bottom: 1rem;
  position: relative;
  width: 100%;

  label {
    font-family: var(--font-family);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    font-size: ${fontSizes.md};
    display: inline-block;
    margin-bottom: 0;
    line-height: 1.25rem;
  }

  input,
  select {
    margin-top: 0.4rem;
    font-size: ${fontSizes.md};
    text-indent: 0.8rem;
    padding: 0.8rem 0;
    outline: none;
    width: 100%;
    background-color: var(--color-muted);
    border: 1px solid var(--color-gray-200);
    border-radius: 2px;
    font-weight: var(--font-weight-normal);
    color: var(--color-text);
  }

  textarea {
    margin-top: 0.4rem;
    resize: vertical;
    display: block;
    width: 100%;
    min-height: calc(1.5em + 0.75rem + 2px);
    max-height: 8rem;
    padding: 0.375rem 0.75rem;
    font-size: ${fontSizes.md};
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-text);
    background-color: var(--color-muted);
    background-clip: padding-box;
    border: 1px solid var(--color-gray-200);
    border-radius: 0.25rem;
  }

  span {
    color: var(--color-error);
  }
`;
const CheckBox = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: transparent;
  position: absolute;
  left: 0;
  top: 0;
  border: 2px solid var(--color-gray-700);
`;
const CheckBoxWrapper = styled.label`
  display: inline-block;
  padding-left: 30px;
  position: relative;
  cursor: pointer;
  user-select: none;
  margin-bottom: 1rem;

  input {
    display: none;
  }

  input:checked + ${CheckBox} {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
  }

  input:checked + ${CheckBox}:after {
    content: '';
    position: absolute;
    height: 6px;
    width: 11px;
    border-left: 2px solid var(--color-always-white);
    border-bottom: 2px solid var(--color-always-white);
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export { FormGroup, CheckBoxWrapper, CheckBox };
