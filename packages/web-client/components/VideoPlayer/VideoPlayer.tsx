/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import { useAlert } from 'react-alert';

import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import config from '../../config';

interface Props {
  stream: any;
}
const VideoPlayer: React.FC<Props> = (props: Props) => {
  const alert = useAlert();

  const videoNode = useRef<HTMLVideoElement>();
  const player = useRef<VideoJsPlayer>();
  useEffect(() => {
    const videoJsOptions: VideoJsPlayerOptions = {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: `http://${config.httpStreamingServerURL}/${props.stream.streamKey}/playlist.m3u8`,
          type: 'application/x-mpegURL',
        },
      ],
      fluid: true,
    };
    player.current = videojs(videoNode.current, videoJsOptions);

    player.current.on('error', () => {
      if (player.current.error().code === 2) {
        alert.show('This Livestream may have ended', { timeout: 10000, type: 'warning' });
      }
    });

    return player.current.dispose;
  }, []);
  return (
    <div data-vjs-player>
      <video
        ref={node => {
          videoNode.current = node;
        }}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
};

export default VideoPlayer;
