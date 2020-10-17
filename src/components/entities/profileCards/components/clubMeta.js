import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'src/components/icon';
import {
  MetaContainer,
  Name,
  Description,
  MetaLinksContainer,
  MetaRow,
} from '../style';

export const ClubMeta = (props) => {
  const { club, id } = props;

  return (
    <MetaContainer>
      <Link to={`/${club.id || id}`}>
        <Name>{club.name}</Name>
      </Link>

      {club.description && <Description>{club.description}</Description>}

      <MetaLinksContainer>
        {club.room && club.time && (
          <React.Fragment>
            <MetaRow as={Link} to={`/${club.id || id}`}>
              <Icon glyph={'home'} size={20} /> {club.room}
            </MetaRow>
            <MetaRow as={Link} to={`/${club.id || id}`}>
              <Icon glyph={'pin'} size={20} /> {`${club.days} @ ${club.time}`}
            </MetaRow>
          </React.Fragment>
        )}
      </MetaLinksContainer>
    </MetaContainer>
  );
};
