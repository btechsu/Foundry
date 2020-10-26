import * as React from 'react';
import { Link } from 'react-router-dom';
import { StyledHeader, Heading, Subheading, HeaderText } from './style';
import { UserAvatar, ClubAvatar } from '../avatar';

class Header extends React.Component {
  render() {
    const { avatar, subheading, heading } = this.props;
    return (
      <StyledHeader>
        {avatar && avatar.club && (
          <ClubAvatar
            club={avatar.club.data()}
            id={avatar.club.id}
            showHoverProfile={false}
            size={48}
          />
        )}
        {avatar && avatar.user && <UserAvatar user={avatar.user} size={48} />}
        <HeaderText>
          <Link to={subheading.to}>
            <Subheading>{subheading.label}</Subheading>
          </Link>
          <Heading>{heading}</Heading>
        </HeaderText>
      </StyledHeader>
    );
  }
}

export default Header;
