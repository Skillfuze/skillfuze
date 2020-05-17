import * as path from 'path';

/* eslint-disable @typescript-eslint/camelcase */
export const streamingServer = {
  logType: 3,
  rtmp: {
    port: process.env.RTMP_STREAMING_PORT || 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: process.env.HTTP_STREAMING_PORT || 8080,
    mediaroot: path.join(process.env.HOME, '.skillfuze/media'),
    allow_origin: '*',
  },
  trans: {
    ffmpeg: process.env.FFMPEG_PATH || '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        customArgs: outPath =>
          `
          -vf scale=w=640:h=360:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4  -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k -hls_segment_filename ${outPath}/360p_%03d.ts ${outPath}/360p.m3u8

          -vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -b:v 2000k -maxrate 2500k -bufsize 4200k -b:a 128k -hls_segment_filename ${outPath}/720p_%03d.ts ${outPath}/720p.m3u8
        `,
        playlist: true,
        playlistFile: `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
720p.m3u8`,
      },
    ],
  },
};
