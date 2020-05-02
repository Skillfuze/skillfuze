import { css } from 'emotion';
import { AlertType } from '../../types/alert.type';

function typeToColor(type: AlertType) {
  const colorMap: any = {
    success: 'success',
    info: 'primary',
    warning: 'warning',
  };

  return colorMap[type];
}

export const baseAlertStyle = (type: AlertType) => {
  const color = typeToColor(type);
  const bgColor = `--color-${color}`;

  return css`
    border: 1px solid;
    border-color: var(${bgColor});
    color: var(${bgColor});
    & svg {
      fill: var(${bgColor});
    }
  `;
};
