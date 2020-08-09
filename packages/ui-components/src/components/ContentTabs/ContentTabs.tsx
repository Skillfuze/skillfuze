import React, { useState } from 'react';
import { cx } from 'emotion';
import { TabProps } from './Tab';
import Button from '../Button';
import Loading from '../Loading';

interface ContentTabsProps {
  className?: string;
  tabs: string[];
  children: React.ReactElement<TabProps>[];
}

const ContentTabs: React.FC<ContentTabsProps> = ({ tabs, children, className }: ContentTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(false);

  const onLoadMore = async () => {
    setIsLoading(true);
    const [tab] = children.filter((child) => child.props.title === selectedTab);
    await tab.props.loadMore?.();
    setIsLoading(false);
  };

  return (
    <div className={cx('flex flex-col w-full space-y-3', className)}>
      <div className="flex border-b border-solid border-grey overflow-y-auto">
        {tabs.map((tab: string) => (
          <button
            key={tab}
            className={`font-semibold text-sm border-b border-solid px-4 py-2 -mb-px ${
              selectedTab === tab ? 'border-primary text-primary' : 'border-grey text-black'
            }`}
            onClick={() => setSelectedTab(tab)}
            style={{ outline: 'none' }}
          >
            {tab}
          </button>
        ))}
      </div>
      {children.filter((child) => child.props.title === selectedTab)}
      {children.filter((child) => child.props.title === selectedTab)[0].props.enableMore && (
        <Button className="self-center" variant="outlined" onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? <Loading /> : 'Load More'}
        </Button>
      )}
    </div>
  );
};

export default ContentTabs;
