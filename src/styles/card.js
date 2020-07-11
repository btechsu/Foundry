import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  word-wrap: break-word;
  background-color: var(--color-card);
  background-clip: border-box;
  border: transparent;
  border-radius: 1rem;
  padding: ${(props) => (props.noPadding ? '0' : '1.25rem')};
  color: var(--color-text);
  box-shadow: 0 5px 9px var(--shadow);
  z-index: 1;
`;

export default Card;
