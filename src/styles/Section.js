import styled from 'styled-components';
import media from './media';

const Section = styled.section`
  position: relative;
  width: auto;
  padding: ${(props) => (props.hero ? '10rem 0' : '0')};
  ${media.tablet`padding: ${(props) => (props.hero ? '4rem 0' : '0')}`}
`;

export default Section;
