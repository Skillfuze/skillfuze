import React from 'react';

import Router from 'next/router';
import { User } from '@skillfuze/types';
import { Button } from '@skillfuze/ui-components';
import Logo from '../../../assets/icons/skillfuze-logo.svg';
import HeaderAvatarWrapper from './HeaderAvatarWrapper';

interface Props {
  showProfileControls?: boolean;
  user?: User;
  controls?: React.ReactNode;
}

const Navbar: React.FC<Props> = (props: Props) => (
  <nav className="flex py-3 px-5 items-center space-x-6">
    <div className="flex-grow self-start">
      <Logo style={{ width: '7.5rem' }} className="cursor-pointer" onClick={() => Router.push('/')} />
    </div>
    <div>{props.controls}</div>
    {props.showProfileControls &&
      (props.user ? (
        <HeaderAvatarWrapper user={props.user} />
      ) : (
        <Button variant="outlined" className="w-48" onClick={() => Router.push('/login')}>
          Login
        </Button>
      ))}
  </nav>
);

Navbar.defaultProps = {
  showProfileControls: true,
};

export default Navbar;
