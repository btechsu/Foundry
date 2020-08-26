// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@components/icon';
import {
  MetaContainer,
  Name,
  Description,
  MetaLinksContainer,
  MetaRow,
} from '../style';

export const ClubMeta = (props) => {
  const { club } = props;

  return (
    <MetaContainer>
      <Link to={`/${club.id}`}>
        <Name>{club.name}</Name>
      </Link>

      {club.description && <Description>{club.description}</Description>}

      <MetaLinksContainer>
        {club.metaData && (
          <React.Fragment>
            <MetaRow as={Link} to={`/${club.id}`}>
              <Icon glyph={'home'} size={20} />{' '}
              {club.metaData.room.toLocaleString()}
            </MetaRow>
            <MetaRow as={Link} to={`/${club.id}`}>
              <Icon glyph={'pin'} size={20} />{' '}
              {club.metaData.time.toLocaleString()}
            </MetaRow>
          </React.Fragment>
        )}
      </MetaLinksContainer>
    </MetaContainer>
  );
};
