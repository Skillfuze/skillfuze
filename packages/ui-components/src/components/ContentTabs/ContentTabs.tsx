import React, { useState } from 'react';
import { TabProps } from './Tab';
import Button from '../Button';
import Loading from '../Loading';

interface ContentTabsProps {
  tabs: string[];
  children: React.ReactElement<TabProps>[];
  enableMore?: boolean;
  loadMore?: () => Promise<void>;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ tabs, children, enableMore, loadMore }: ContentTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(false);

  const onLoadMore = async () => {
    setIsLoading(true);
    await loadMore?.();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="flex border-b border-solid border-grey">
        {tabs.map((tab: string) => (
          <button
            key={tab}
            className={`font-semibold text-sm border-b border-solid px-4 py-1 -mb-px ${
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
      {enableMore && (
        <Button className="self-center" variant="outlined" onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? <Loading /> : 'Load More'}
        </Button>
      )}
    </div>
  );
};

ContentTabs.defaultProps = {
  enableMore: false,
};

export default ContentTabs;
