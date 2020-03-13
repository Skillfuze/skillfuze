/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';

import SkillFuze from '../assets/icons/skillfuze-logo.svg';

export const Header = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/register');
  };
  return (
    <div className="flex flex-auto flex-row items-center">
      <div className="flex flex-auto">
        <SkillFuze />
      </div>
      <div>
        <Button onClick={handleOnClick} className="w-48 mr-12" variant="outlined">
          Register
        </Button>
      </div>
    </div>
  );
};
