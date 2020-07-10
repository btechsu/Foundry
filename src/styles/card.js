import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  word-wrap: break-word;
  background-color: var(--color-muted);
  background-clip: border-box;
  border: transparent;
  border-radius: 1rem;
  padding: ${(props) => (props.noPadding ? '0' : '1.25rem')};
  color: var(--color-text);
  box-shadow: 0 3px 9px var(--color-muted);
`;

export default Card;
