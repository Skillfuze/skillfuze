import { css } from 'emotion';

export const containerStyle = css`
  border-radius: 4px;
  border: solid 1px var(--color-grey);
  color: var(--color-black);
  font-size: 14px;
  display: flex;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }

  &:hover {
    border-color: var(--color-primary-light);
  }
`;

export const listStyle = css`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const listItemStyle = css`
  align-items: center;
  background: var(--color-primary);
  color: white;
  display: flex;
  list-style: none;
  border-radius: 0.2rem;
`;
