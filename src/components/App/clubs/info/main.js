import React from 'react';
import PropTypes from 'prop-types';

// styles
import styled from 'styled-components';
import { mixins, theme, Card, GridCol } from '@styles';

const { fontSizes } = theme;

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, max-content);
  grid-template-areas: 'body';
  grid-gap: 0.5rem;
`;
const BodyWrapper = styled.div`
  grid-area: body;
  padding: 1.25rem;

  a {
    ${mixins.inlineLink};
  }
`;

const StyledParagraph = styled.div`
  margin-bottom: 2rem;
  ${mixins.regularText};
`;

const Main = ({ data }) => {
  if (data === undefined) {
    return (
      <GridCol spans={8}>
        <StyledCard>
          <BodyWrapper>Nothing to see here...</BodyWrapper>
        </StyledCard>
      </GridCol>
    );
  }

  const text = JSON.parse(data);
  let returnedHTML = '';

  text.map((obj) => {
    switch (obj.type) {
      case 'paragraph':
        console.log(obj);
        returnedHTML += `<p class="${StyledParagraph}">${obj.data.text}</p>\n`;
        break;
      case 'simpleImage':
        if (obj.data.stretched === true) {
          returnedHTML += `<div style="margin-bottom:2rem;text-align:center;"><img style="max-width:none;width:100%;vertical-align:bottom;" src="${obj.data.url}" alt="${obj.data.caption}" />\n<i style="font-size:${fontSizes.lg};">${obj.data.caption}</i></div>\n`;
        } else if (obj.data.withBackground === true) {
          returnedHTML += `<div style="background:var(--color-muted);padding:10px;text-align:center;"><img style="display:block;max-width:60%;margin:0 auto;vertical-align:bottom;" src="${obj.data.url}" alt="${obj.data.caption}" />\n<i style="font-size:${fontSizes.lg};">${obj.data.caption}</i></div>\n`;
        } else if (obj.data.withBorder === true) {
          returnedHTML += `<div style="border: 1px solid #e8e8eb;padding:1px;text-align:center;"><img style="max-width:100%;vertical-align:bottom;" src="${obj.data.url}" alt="${obj.data.caption}" /></div>\n<div style="text-align:center"><i style="font-size:${fontSizes.lg};">${obj.data.caption}</i></div>\n`;
        } else {
          returnedHTML += `<div style="text-align:center;"><img style="max-width:100%;vertical-align:bottom;" src="${obj.data.url}" alt="${obj.data.caption}" />\n<i style="font-size:${fontSizes.lg};">${obj.data.caption}</i></div>\n`;
        }
        break;
      case 'header':
        returnedHTML += `<h${obj.data.level}>${obj.data.text}</h${obj.data.level}>\n`;
        break;
      case 'list':
        console.log(obj);
        if (obj.data.style === 'unordered') {
          const list = obj.data.items
            .map((item) => {
              return `<li style="padding-top: 0.5rem;">${item}</li>`;
            })
            .join('');
          returnedHTML += `<div><ul style="padding-left: 1rem;">${list}</ul></div>\n`;
        } else {
          const list = obj.data.items
            .map((item) => {
              return `<li style="padding-top: 0.5rem;">${item}</li>`;
            })
            .join('');
          returnedHTML += `<div><ol style="padding-left: 1rem;">${list}</ol></div>\n`;
        }
        break;
      default:
        return '';
    }

    return returnedHTML;
  });

  return (
    <GridCol spans={8}>
      <StyledCard>
        <BodyWrapper
          dangerouslySetInnerHTML={{ __html: returnedHTML }}
        ></BodyWrapper>
      </StyledCard>
    </GridCol>
  );
};

export default Main;

Main.propTypes = {
  data: PropTypes.any.isRequired,
};
