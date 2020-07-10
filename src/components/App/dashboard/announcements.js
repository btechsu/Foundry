import React from 'react';
import { Link } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { Card, mixins, theme, media } from '@styles';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 8;

  ${media.desktop`grid-column-end: span 12;`};
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 4rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body' 'footer';
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-area: header;
`;
const HeaderItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
`;
const HeaderText = styled.h3`
  color: var(--color-text);
  margin: 0;
  font-size: ${fontSizes.xl};
`;
const BodyWrapper = styled.div`
  grid-area: body;
`;
const BodyText = styled.p`
  position: relative;
  width: 100%;
  max-height: 1.5rem;
  display: inline-block;
  font-weight: var(--font-weight-normal);
  opacity: 0.7;
  margin: 0;
`;
const ListContainer = styled.div`
  min-height: 9rem;
`;
const List = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-gap: 1rem;
`;
const ListItem = styled.div`
  opacity: 1;
  transform: none;
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: start;
  width: 100%;
  align-items: center;
`;
const ListItemContent = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  align-items: center;
  ${media.tablet`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  `};
`;
const ListDate = styled.span`
  color: ${(props) =>
    props.unread ? 'var(--color-secondary)' : 'var(--color-gray-900)'};
`;
const ListIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-right: 1rem;
  position: relative;
`;
const StyledIcon = styled.svg`
  fill: currentColor;
  width: 10px;
  height: 10px;
  color: ${(props) =>
    props.unread ? 'var(--color-secondary)' : 'var(--color-gray-700)'};
`;
const ListHoverable = styled.a`
  display: inline-block;
  text-decoration: none;
  text-decoration-skip-ink: auto;
  font-size: ${fontSizes.md};
  position: relative;
  color: ${(props) =>
    props.unread ? 'var(--color-secondary)' : 'var(--color-gray-700)'};

  :hover,
  :focus,
  :active {
    outline: 0;
    text-decoration: underline;
  }
`;
const FooterWrapper = styled.div`
  grid-area: footer;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
const FooterButton = styled(Link)`
  ${mixins.inlineLink}

  svg {
    overflow: hidden;
    position: relative;
    top: 0.425rem;
    fill: currentcolor;
    height: 24;
    width: 24;
  }
`;

const AnnouncementsCard = () => {
  return (
    <GridWrapper>
      <StyledCard>
        <HeaderWrapper>
          <HeaderItems>
            <HeaderText>
              <span role="img" aria-label="">
                📣
              </span>{' '}
              Recent announements
            </HeaderText>
          </HeaderItems>
        </HeaderWrapper>
        <BodyWrapper>
          <ListContainer>
            <List>
              <ListItem>
                <ListIconWrapper>
                  <StyledIcon
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                    />
                  </StyledIcon>
                </ListIconWrapper>
                <ListHoverable href="/">
                  <ListItemContent>
                    <ListDate>07/09/20</ListDate>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </span>
                  </ListItemContent>
                </ListHoverable>
              </ListItem>
              <ListItem>
                <ListIconWrapper>
                  <StyledIcon
                    unread
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                    />
                  </StyledIcon>
                </ListIconWrapper>
                <ListHoverable href="/" unread>
                  <ListItemContent>
                    <ListDate unread>07/09/20</ListDate>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </span>
                  </ListItemContent>
                </ListHoverable>
              </ListItem>
              <ListItem>
                <ListIconWrapper>
                  <StyledIcon
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                    />
                  </StyledIcon>
                </ListIconWrapper>
                <ListHoverable href="/">
                  <ListItemContent>
                    <ListDate>07/09/20</ListDate>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </span>
                  </ListItemContent>
                </ListHoverable>
              </ListItem>
              <ListItem>
                <ListIconWrapper>
                  <StyledIcon
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                    />
                  </StyledIcon>
                </ListIconWrapper>
                <ListHoverable href="/">
                  <ListItemContent>
                    <ListDate>07/09/20</ListDate>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor.
                    </span>
                  </ListItemContent>
                </ListHoverable>
              </ListItem>
            </List>
          </ListContainer>
        </BodyWrapper>
        <FooterWrapper>
          <FooterButton to={ROUTES.ANNOUNCEMENTS_BASE}>
            View all{' '}
            <svg
              className="icon__58iry4WvgWzW_NpqDXBLP"
              fill="currentColor"
              height="24"
              version="1.1"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Right Arrow Icon</title>
              <path
                d="M4 10.92v2h12l-5.5 5.5 1.42 1.42 7.92-7.92L11.92 4 10.5 5.42l5.5 5.5z"
                fillRule="nonzero"
              />
            </svg>
          </FooterButton>
        </FooterWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default AnnouncementsCard;
