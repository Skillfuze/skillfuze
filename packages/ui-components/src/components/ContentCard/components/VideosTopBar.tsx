import React from 'react';
import { cx } from 'emotion';

import { isLiveStyle, viewsStyle } from '../styles';

interface Props {
  isLive: boolean;
  views: number;
}

const VideosTopBar: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.isLive && <p className={cx(isLiveStyle, 'p-0 px-3 my-1 mr-1')}>LIVE</p>}
      <p className={cx(viewsStyle, 'p-0 px-3 my-1 mr-1 text-xs')}>
        {props.isLive ? `${props.views} Watching Now` : `${props.views} Views`}
      </p>
    </>
  );
};

VideosTopBar.defaultProps = {
  isLive: false,
  views: 0,
};
export default VideosTopBar;
