import styled from 'styled-components';
import { theme } from '@styles';

const { fontSizes } = theme;

export const SearchForm = styled.form`
  width: 100%;
  padding: ${(props) => (props.small ? '1rem' : '1.5rem')};
  border: 2px solid var(--color-card);
  border-radius: 1.5rem;
  box-shadow: 0px 5px 9px var(--shadow);
  background-color: var(--color-card);
  font-size: ${(props) => (props.small ? fontSizes.md : fontSizes.lg)};
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    color: var(--color-gray-700);
    width: ${(props) => (props.small ? '1rem' : '1.5rem')};
    height: ${(props) => (props.small ? '1rem' : '1.5rem')};
  }
`;
export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-text);
  margin-left: 1rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: var(--color-gray-500);
  }

  ::-webkit-search-cancel-button {
    display: none;
  }
`;
export const PaginationWrapper = styled.div`
  width: 100%;
  margin-top: ${(props) => (props.mt ? props.mt : '2rem')};
  display: flex;
  justify-content: center;

  ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
  }
  li {
    font-size: ${fontSizes.lg};
    padding: 0.4rem 0.9rem;
    margin: 0.2rem;
    color: var(--color-always-white);
    background-color: var(--color-secondary-shaded);
  }
  a {
    text-decoration: none;
    color: var(--color-always-white);
  }

  div {
  }
`;
export const CancelButton = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  display: ${(props) => (props.hide ? 'none' : 'relative')};

  :focus {
    outline: 0;
  }
`;
export const RefinmentWrapper = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    color: var(--color-text);
    font-size: ${fontSizes.lg};
  }
`;
