import { css } from 'emotion';

export const baseSelectFieldStyle = css`
  font-size: 14px;

  & > div:first-of-type {
    border-radius: 4px;
    border: solid 1px var(--color-grey);
    color: var(--color-black);

    &:hover {
      border-color: var(--color-primary-light);
    }
  }
`;

export const errorState = css`
  & > :first-child {
    border-color: var(--color-warning) !important;
    &:focus,
    :hover {
      border-color: var(--color-warning);
    }
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
