import { css } from 'emotion';

export const buttonNoFocusStyle = css`
  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
    color: black;
  }
`;

export const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: '1px solid #ccc',
    transform: 'translate(-50%, -50%)',
    color: 'grey',
  },
  overlay: {
    backgroundColor: 'rgba(128, 128, 128, 0.75)',
  },
};
