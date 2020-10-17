import { theme } from 'shared/theme';
import styled from 'styled-components';
import { zIndex } from 'src/components/globals';
import { MEDIA_BREAK } from 'src/components/layout';

export const ContentContainer = styled.div`
  padding: 128px 32px 72px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 auto;
  max-width: ${MEDIA_BREAK}px;
  z-index: ${zIndex.card};
  @media (max-width: ${MEDIA_BREAK}px) {
    padding-top: 0;
    max-width: 100%;
    padding: 32px;
    padding-top: 64px;
  }
`;

export const Heading = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${(props) =>
    props.reverse ? props.theme.text.reverse : props.theme.text.default};
  line-height: 1.2;
  grid-area: heading;
  @media (max-width: ${MEDIA_BREAK}px) {
    margin-top: 48px;
    font-size: 32px;
  }
`;

export const Copy = styled.p`
  font-size: 20px;
  font-weight: ${(props) => (props.reverse ? '500' : '400')};
  color: ${(props) =>
    props.reverse ? props.theme.text.reverse : props.theme.text.secondary};
  line-height: 1.6;
  margin-top: 24px;
  & + & {
    margin-top: 16px;
  }
  a {
    color: ${theme.brand.alt};
    text-decoration: underline;
    &:hover {
      color: ${theme.brand.dark};
    }
  }
  b {
    font-weight: 700;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 72px 0 0;
  width: 100%;
`;

export const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.text.default};
  line-height: 1.3;
  margin-bottom: 16px;
`;

export const SectionDescription = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: ${theme.text.secondary};
  line-height: 1.4;
  & + & {
    margin-top: 16px;
  }
  a {
    color: ${theme.brand.alt};
    font-weight: 500;
  }
`;
