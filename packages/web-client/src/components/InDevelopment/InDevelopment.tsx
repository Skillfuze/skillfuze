import React from 'react';
import InDevelopmentIllustration from '../../../assets/illustrations/in_development.svg';

const InDevelopment: React.FC = () => {
  return (
    <div className="flex flex-grow flex-col max-w-screen-md mx-auto items-center justify-center p-6">
      <InDevelopmentIllustration />
      <h3 className="mt-10 text-black">This page is currently in development</h3>
      <p className="mt-2 text-grey-dark">We&apos;re working on it!</p>
    </div>
  );
};

export default InDevelopment;
