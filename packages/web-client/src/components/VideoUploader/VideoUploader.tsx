import React, { useEffect } from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import Webcam from '@uppy/webcam';
import ScreenCapture from '@uppy/screen-capture';
import { Dashboard } from '@uppy/react';

import config from '../../../config';
import { useLazyRef } from '../../utils/hooks/useLazyRef';

interface Props {
  onComplete: (result: Uppy.UploadResult<{}, {}>) => void;
}

const VideoUploader: React.FC<Props> = ({ onComplete }: Props) => {
  const uppyRef = useLazyRef(() =>
    Uppy({
      id: 'uppy/uploadedVideos',
      autoProceed: true,
      allowMultipleUploads: false,
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ['video/*'],
      },
    })
      .use(Tus, {
        id: 'tus/uploadedVideos',
        endpoint: `${config.apiURL}/api/v1/videos/upload`,
      })
      .use(Webcam)
      .use(ScreenCapture)
      .on('complete', onComplete),
  );

  useEffect(() => {
    return () => uppyRef.current.close();
  }, []);

  return (
    <Dashboard
      uppy={uppyRef.current}
      plugins={['Webcam', 'GoogleDrive', 'ScreenCapture']}
      showLinkToFileUploadResult={false}
      height={470}
      proudlyDisplayPoweredByUppy={false}
    />
  );
};
export default VideoUploader;
