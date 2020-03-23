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
    <div className="flex flex-auto flex-row items-center p-2">
      <div className="flex-grow">
        <SkillFuze />
      </div>
      <div className="mr-12 w-1/6">
        <Button className="w-full" onClick={handleOnClick} variant="outlined">
          Register
        </Button>
      </div>
    </div>
  );
};
