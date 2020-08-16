import React from 'react';

export interface TabProps {
  title: string;
  children?: React.ReactNode;
  loadMore?: () => Promise<void>;
  enableMore?: boolean;
}

const Tab: React.FC<TabProps> = ({ children }: TabProps) => <>{children}</>;

Tab.defaultProps = {
  enableMore: false,
};

export default Tab;
