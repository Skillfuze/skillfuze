import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import CopyToClipboard from 'react-copy-to-clipboard';
import Modal from 'react-modal';

import { buttonNoFocusStyle, modalStyle } from './styles';
import More from '../../assets/icons/More.svg';
import Facebook from '../../assets/icons/Facebook.svg';
import CopyLink from '../../assets/icons/Copy.svg';
import Twitter from '../../assets/icons/Twitter.svg';
import Edit from '../../assets/icons/Edit.svg';
import Delete from '../../assets/icons/Delete.svg';
import { useOnClickOutside } from '../../utils/useOnClickOutside';
import Button from '../Button';

interface MoreActionsProps {
  URL: string;
  enableControls?: boolean;
  onEdit?: any;
  onDelete?: any;
}

const MoreActions: React.FC<MoreActionsProps> = ({ URL, enableControls, onEdit, onDelete }: MoreActionsProps) => {
  const facebookSharer = `https://www.facebook.com/sharer/sharer.php?u=${URL}`;
  const twitterSharer = `https://twitter.com/intent/tweet?url=${URL}`;
  const [showPopper, setShowPopper] = useState(false);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const popperElementRef = useRef(null);
  const moreRef = useRef(null);

  useOnClickOutside(popperElementRef, () => {
    setShowPopper(false);
  });

  const onClickShareToFacebook = (): void => {
    window.open(facebookSharer);
  };
  const onClickShareToTwitter = (): void => {
    window.open(twitterSharer);
  };

  const { styles, attributes } = usePopper(moreRef.current, popperElementRef.current, {
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

  const onClickDelete = () => {
    setShowPopper(false);
    setModalOpened(true);
  };

  return (
    <div>
      <button type="button" className={buttonNoFocusStyle} ref={moreRef} onClick={() => setShowPopper(!showPopper)}>
        <More />
      </button>
      {showPopper && (
        <div
          className="bg-white shadow rounded-sm p-4 pb-0 space-y-4 flex flex-col text-sm text-grey-dark z-10"
          style={styles.popper}
          ref={popperElementRef}
          {...attributes.popper}
        >
          <CopyToClipboard text={URL}>
            <button className={`flex items-center ${buttonNoFocusStyle}`}>
              <CopyLink />
              <p className="ml-2">Copy Link</p>
            </button>
          </CopyToClipboard>
          <button className={`flex items-center ${buttonNoFocusStyle}`} onClick={onClickShareToFacebook}>
            <Facebook />
            <p className="ml-2">Share to Facebook</p>
          </button>
          <button className={`flex items-center ${buttonNoFocusStyle}`} onClick={onClickShareToTwitter}>
            <Twitter />
            <p className="ml-2">Share to Twitter</p>
          </button>
          {enableControls && (
            <>
              <hr className="border-grey-light self-stretch" />
              <button className={`flex items-center ${buttonNoFocusStyle}`} onClick={onEdit}>
                <Edit />
                <p className="ml-2">Edit</p>
              </button>
              {onDelete && (
                <button className={`flex items-center ${buttonNoFocusStyle}`} onClick={onClickDelete}>
                  <Delete />
                  <p className="ml-2">Delete</p>
                </button>
              )}
            </>
          )}
          <div ref={setArrowElement} />
        </div>
      )}
      <Modal
        isOpen={modalOpened}
        shouldCloseOnOverlayClick
        onRequestClose={() => setModalOpened(false)}
        style={modalStyle}
        contentLabel="Delete Confirmation"
        ariaHideApp={false}
      >
        <p>Are you sure you want to delete this?</p>
        <div className="flex justify-center justify-around mt-2">
          <Button variant="outlined" onClick={() => setModalOpened(false)}>
            No
          </Button>
          <Button color="warning" onClick={onDelete}>
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  );
};
MoreActions.defaultProps = {
  enableControls: false,
};

export default MoreActions;
