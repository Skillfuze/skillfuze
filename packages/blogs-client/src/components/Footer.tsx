import React from 'react';
import Logo from '../../assets/icons/skillfuze-logo-white.svg';
import Github from '../../assets/icons/github.svg';

export const Footer = () => {
  return (
    <div className="flex flex-col w-full h-18 bg-primary p-4">
      <div className="flex flex-grow justify-between items-center">
        <Logo height="25" />
        <div className="text-white text-sm space-x-8">
          <a target="#" href="https://styleguide.skillfuze.com">
            Style Guide
          </a>
          <a target="#" href="https://api.skillfuze.com/docs">
            API Docs
          </a>
          <a target="#" href="">
            Meet the Team
          </a>
          <a target="#" href="https://github.com/Skillfuze/skillfuze#contributors">
            <Github height="20" fill="white" className="inline" />
          </a>
        </div>
      </div>
    </div>
  );
};
