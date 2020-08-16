import React from 'react';
import { HeaderAvatar } from '@skillfuze/ui-components';
import { User } from '@skillfuze/types';
import Router from 'next/router';
import AuthService from '../../services/auth.service';

interface HeaderAvatarWrapperProps {
  user: User;
}

const HeaderAvatarWrapper: React.FC<HeaderAvatarWrapperProps> = ({ user }: HeaderAvatarWrapperProps) => {
  return (
    <HeaderAvatar
      username={user.username}
      avatarURL={user.avatarURL}
      displayName={`${user.firstName} ${user.lastName}`}
      push={Router.push}
      logout={AuthService.logout}
    />
  );
};

export default HeaderAvatarWrapper;
