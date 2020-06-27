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
