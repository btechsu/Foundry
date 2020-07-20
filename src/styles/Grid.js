import styled from 'styled-components';
import media from './media';

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.col ? props.col : 12}, minmax(0, 1fr))`};
  grid-column-gap: ${(props) => (props.colGap ? props.colGap : '1rem')};
  grid-row-gap: ${(props) => (props.rowGap ? props.rowGap : '3rem')};
  align-items: ${(props) => (props.align ? props.align : 'stretch')};

  @media only screen and (min-width: 64rem) {
    grid-column-gap: 2rem;
  }
`;
export const GridCol = styled.div`
  display: grid;
  grid-column-end: span ${(props) => (props.spans ? props.spans : '4')};
  z-index: 1;

  ${media.tablet`grid-column-end: span 12!important;`};
  ${media.desktop`
    grid-column-end: span ${(props) =>
      props.tabletSpans ? props.tabletSpans : 12};
  `};
`;
