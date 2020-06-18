import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { buttonNoFocusStyle } from './styles';
import Avatar from '../Avatar';
import { useOnClickOutside } from '../../utils/useOnClickOutside';

interface Path {
  display: string;
  path: string;
}

interface HeaderAvatarProps {
  displayName: string;
  username: string;
  avatarURL: string;
  push: (path: string) => void;
  logout: () => void;
  paths?: Path[];
}

const HeaderAvatar: React.FC<HeaderAvatarProps> = ({
  avatarURL,
  displayName,
  username,
  push,
  logout,
  paths: initialPaths,
}: HeaderAvatarProps) => {
  const [paths] = useState<Path[]>(
    initialPaths || [
      { display: 'New Livestream', path: '/livestreams/new' },
      { display: 'New Course', path: '/courses/new' },
      { display: 'New Video', path: '/videos/new' },
      { display: 'New Blog', path: '/blogs/new' },
    ],
  );

  const [showPopper, setShowPopper] = useState(false);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const popperElementRef = useRef(null);
  const avatarRef = useRef(null);
  useOnClickOutside(popperElementRef, () => {
    setShowPopper(false);
  });

  const { styles, attributes } = usePopper(avatarRef.current, popperElementRef.current, {
    placement: 'bottom-end',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <div>
      <button type="button" className={buttonNoFocusStyle} ref={avatarRef} onClick={() => setShowPopper(!showPopper)}>
        <Avatar URL={avatarURL} alt="Profile Picture" />
      </button>
      {showPopper && (
        <div
          className="bg-white shadow rounded-sm p-4 pb-0 space-y-4 flex flex-col items-start"
          style={styles.popper}
          ref={popperElementRef}
          {...attributes.popper}
        >
          <button className={`${buttonNoFocusStyle} flex text-left items-center`}>
            <Avatar URL={avatarURL} alt="Profile Picture" />
            <div className="flex flex-col ml-2">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-sm text-grey-dark">{username}</p>
            </div>
          </button>
          <hr className="border-grey-light self-stretch" />
          {paths.map((path) => (
            <button
              key={path.path}
              className={`${buttonNoFocusStyle} text-grey-dark text-sm`}
              onClick={() => push(path.path)}
            >
              {path.display}
            </button>
          ))}
          <hr className="border-grey-light self-stretch" />
          <button
            className={`${buttonNoFocusStyle} text-grey-dark text-sm`}
            onClick={() => push(`/profile/${username}`)}
          >
            Profile
          </button>
          <button className={`${buttonNoFocusStyle} text-grey-dark text-sm`} onClick={() => push('/settings')}>
            Settings
          </button>
          <button className={`${buttonNoFocusStyle} text-grey-dark text-sm`} onClick={logout}>
            Logout
          </button>
          <div ref={setArrowElement} />
        </div>
      )}
    </div>
  );
};

export default HeaderAvatar;
