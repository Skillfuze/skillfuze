import { css } from 'emotion';

export const carouselChild = css`
  & > :not(first-child) {
    padding-left: 0.75rem;
  }
`;

export const arrowBtnStyle = css`
  &::before {
    content: '' !important;
  }
`;
