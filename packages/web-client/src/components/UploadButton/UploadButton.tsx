import React, { useRef, useState, ChangeEvent } from 'react';
import { AttachmentType } from '@skillfuze/types';

import { AttachmentsService } from '../../services/attachments.service';

interface UploadButtonProps {
  onUploadComplete: (url: string) => void;
  type: AttachmentType;
  accept: 'video/*' | 'image/*' | 'video/*,image/*';
  label?: string;
  placeholder?: string;
  className?: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onUploadComplete,
  label,
  type,
  accept,
  placeholder,
  className,
}: UploadButtonProps) => {
  const inputRef = useRef();
  const [inputText, setInputText] = useState(placeholder || 'Choose a file');

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputText('Uploading...');
    const file: File = event.target.files[0];
    const { url } = await AttachmentsService.upload(file, type);
    onUploadComplete(url);
    setInputText(`${file.name} [Upload Completed]`);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <p className="text-grey-dark text-sm mb-1">{label}</p>}
      <div className="flex border select-none border-solid border-grey rounded items-center">
        <p className="flex-grow text-sm pl-2 text-grey">{inputText}</p>
        <div className="border border-solid border-primary rounded-r -m-px upload-button-wrapper">
          <button className="font-bold bg-primary text-sm text-white p-2 px-4 upload-button">UPLOAD</button>
          <input type="file" ref={inputRef} onChange={onFileChange} accept={accept} />
        </div>
      </div>
      <style jsx>
        {`
          .upload-button-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
          }

          .upload-button {
            min-height: 37px;
          }

          .upload-button-wrapper input[type='file'] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
          }

          input[type='file'],
          input[type='file']::-webkit-file-upload-button {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default UploadButton;
