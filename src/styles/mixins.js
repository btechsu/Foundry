import { css } from 'styled-components';
import theme from './theme';

const { fontSizes } = theme;

const mixins = {
  primaryButton: css`
    background-color: var(--color-secondary);
    color: var(--color-always-white);
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family-mono);
    user-select: none;
    border: 1px solid transparent;
    transition: box-shadow 0.3s ease;

    :hover {
      box-shadow: 0 6px 8px var(--shadow);
    }
  `,
  secondaryButton: css`
    background-color: transparent;
    color: var(--color-gray-900);
    font-family: var(--font-family-mono);
    user-select: none;
    border: 1px solid var(--color-gray-700);
    transition: opacity 0.3s ease;

    :hover {
      opacity: 0.7;
    }
  `,
  smallButton: css`
    text-decoration: none;
    font-size: ${fontSizes.md};
    line-height: 1.5;
  `,
  bigButton: css`
    text-decoration: none;
    font-size: ${fontSizes.lg};
    line-height: 1.5;
  `,
  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    color: var(--color-primary);

    :hover,
    :focus,
    :active {
      outline: 0;
      text-decoration: underline;
    }
  `,
  regularText: css`
    color: var(--color-text);
    font-size: ${fontSizes.md};
    font-family: var(--font-family-mono);
  `,
  resetButton: css`
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;

    :focus {
      outline: 0;
      border: 0;
      padding: 0;
    }
  `,
};

export default mixins;
