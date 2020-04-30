import { css } from 'emotion';

export const baseInputStyle = css`
  border-radius: 4px;
  border: solid 1px var(--color-grey);
  color: var(--color-black);
  font-size: 14px;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  &:hover {
    border-color: var(--color-primary-light);
  }

  &::placeholder {
    color: var(--color-grey);
  }
`;

export const disabledInputStyle = css`
  background: var(--color-grey-light);
`;

export const errorState = css`
  border-color: var(--color-warning);
  &:focus,
  :hover {
    border-color: var(--color-warning);
  }
`;

export const errorType = css`
  color: var(--color-warning);
  font-size: 10px;
`;

export const labelType = css`
  color: var(--color-black);
  font-size: 14px;
`;

export const borderless = css`
  border: 0;
`;
