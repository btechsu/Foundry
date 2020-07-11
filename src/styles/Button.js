import styled from 'styled-components';
import { Link } from 'gatsby';

const Button = styled(Link)`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 1px solid transparent;
  border-radius: 2px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 1rem;
  line-height: 1.5;
  min-width: 8rem;
  transition: all 0.1s ease-in-out;
`;

const ClickableButton = styled.button`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 1px solid transparent;
  border-radius: 2px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 1rem;
  line-height: 1.5;
  min-width: 8rem;
  transition: all 0.1s ease-in-out;
`;

export { Button, ClickableButton };
