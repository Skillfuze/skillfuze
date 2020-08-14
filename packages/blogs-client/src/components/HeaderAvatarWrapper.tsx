import React from 'react';
import { HeaderAvatar } from '@skillfuze/ui-components';
import { User } from '@skillfuze/types';
import AuthService from '../services/auth.service';
import { navigate } from '../utils/navigate';

interface HeaderAvatarWrapperProps {
  user: User;
}

const HeaderAvatarWrapper: React.FC<HeaderAvatarWrapperProps> = ({ user }: HeaderAvatarWrapperProps) => {
  return (
    <HeaderAvatar
      username={user.username}
      avatarURL={user.avatarURL}
      displayName={`${user.firstName} ${user.lastName}`}
      push={navigate}
      logout={AuthService.logout}
    />
  );
};

export default HeaderAvatarWrapper;
