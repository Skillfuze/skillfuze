import React, { useState } from 'react';
import { LivestreamsEvents } from '@skillfuze/types';
import { useSocket } from '@khaled-hamam/use-socketio';

const WatchingNow = () => {
  const [watchingNow, setWatchingNow] = useState(0);
  useSocket(LivestreamsEvents.WATCHING_NOW, setWatchingNow);

  return <>{`${watchingNow} watching now`}</>;
};

export default WatchingNow;
