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
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
    color: var(--color-primary);

    :hover,
    :focus,
    :active {
      color: var(--color-primary);
      outline: 0;
      text-decoration: underline;
    }
  `,
  regularText: css`
    color: var(--color-text);
    font-size: ${fontSizes.md};
    font-family: var(--font-family-mono);
  `,
};

export default mixins;
