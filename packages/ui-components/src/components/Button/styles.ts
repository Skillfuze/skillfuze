import { css } from 'emotion';
import { Color } from '../../types/colors.type';

export const baseButtonStyle = css`
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: var(--color-white);
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`;

export const primaryButtonStyle = (color: Color) => {
  const bgColor = `--color-${color}`;

  return css`
    background-color: var(${bgColor});
    &:hover {
      background-color: var(${bgColor}-light);
    }
    &:active {
      background-color: var(${bgColor}-dark);
    }
  `;
};

export const outlinedButtonStyle = (color: Color) => {
  const bgColor = `--color-${color}`;

  return css`
    border: 1px solid;
    border-color: var(${bgColor});
    color: var(${bgColor});
    &:hover {
      background-color: var(${bgColor}-light);
      color: var(--color-white);
    }
    &:active {
      background-color: var(${bgColor}-dark);
      color: var(--color-white);
    }
  `;
};

export const linkButtonStyle = (color: Color) => {
  const bgColor = `--color-${color}`;

  return css`
    border: none;
    color: var(${bgColor});
    text-transform: none;
    padding: 0;
  `;
};
