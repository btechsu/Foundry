import React, { useState } from 'react';
import { Link } from 'gatsby';
import { ROUTES } from '@utils';

// styles
import styled from 'styled-components';
import { Card, DropDown, mixins, theme, media } from '@styles';
import { FormattedIcon } from '@components/icons';

// form
import { Formik, Form, Field } from 'formik';

const { fontSizes } = theme;

const GridWrapper = styled.div`
  display: grid;
  grid-column-end: span 7;
  z-index: 1;

  ${media.desktop`grid-column-end: span 12;`};
`;
const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: minmax(0, 3rem) 1fr minmax(0, max-content);
  grid-template-areas: 'header' 'body' 'footer';
  grid-gap: 0.5rem;
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-area: header;
`;
const HeaderItems = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
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
const StyledIcon = styled.div`
  svg {
    fill: currentColor;
    width: 10px;
    height: 10px;
    color: ${(props) =>
      props.unread ? 'var(--color-secondary)' : 'var(--color-gray-700)'};
  }
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
const SortIconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;

  svg:not(:root) {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color-text);
  }

  span {
    font-size: 1.125rem;
    line-height: 1.125rem;
    vertical-align: text-bottom;
    margin: 0;
  }
`;
const ButtonWrapper = styled.button`
  z-index: 6;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  user-select: none;
  cursor: pointer;
  :focus {
    outline: 0;
  }
`;
const ChoicesWrapper = styled.div`
  div {
    padding: 0.3rem 0;
    display: flex;
    align-items: center;

    label {
      padding: 0;
      margin: 0;
      cursor: pointer;
    }

    input {
      margin-right: 0.6rem;
      cursor: pointer;

      :after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: var(--color-background);
        content: '';
        display: inline-block;
        border: 2px solid var(--color-gray-300);
      }
    }

    input:checked:after {
      width: 15px;
      height: 15px;
      border-radius: 15px;
      top: -2px;
      left: -1px;
      position: relative;
      background-color: var(--color-tertiary);
      content: '';
    }
  }
`;

const AnnouncementsCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
            <SortIconWrapper>
              <ButtonWrapper onClick={toggleMenu}>
                <FormattedIcon name="sort" />
              </ButtonWrapper>
              <DropDown open={isOpen} toggleMenu={toggleMenu} title="Sort by">
                <Formik initialValues={{ radioGroup: 'all' }}>
                  {() => (
                    <Form>
                      <ChoicesWrapper>
                        <div>
                          <Field
                            type="radio"
                            name="radioGroup"
                            value="all"
                            id="inlineRadio1"
                          />{' '}
                          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                          <label htmlFor="inlineRadio1">All</label>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="radioGroup"
                            value="clubs"
                            id="inlineRadio2"
                          />{' '}
                          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                          <label htmlFor="inlineRadio2">Only my clubs</label>
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="radioGroup"
                            value="grade"
                            id="inlineRadio3"
                          />{' '}
                          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                          <label htmlFor="inlineRadio3">Only my grade</label>
                        </div>
                      </ChoicesWrapper>
                    </Form>
                  )}
                </Formik>
              </DropDown>
            </SortIconWrapper>
          </HeaderItems>
        </HeaderWrapper>
        <BodyWrapper>
          <BodyText>
            Below are announements specifically picked out for your year and
            club(s).
          </BodyText>
          <ListContainer>
            <List>
              <ListItem>
                <ListIconWrapper>
                  <StyledIcon>
                    <FormattedIcon name="circle" />
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
                  <StyledIcon unread>
                    <FormattedIcon name="circle" />
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
                  <StyledIcon>
                    <FormattedIcon name="circle" />
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
                  <StyledIcon>
                    <FormattedIcon name="circle" />
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
            View all <FormattedIcon name="right-arrow" />
          </FooterButton>
        </FooterWrapper>
      </StyledCard>
    </GridWrapper>
  );
};

export default AnnouncementsCard;
