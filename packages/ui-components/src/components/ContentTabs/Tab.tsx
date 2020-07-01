import React from 'react';

export interface TabProps {
  title: string;
  children?: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }: TabProps) => <>{children}</>;
