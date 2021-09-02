import { css } from '@emotion/react';

const centerAll = css`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const rightAlign = css`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const leftAlign = css`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const flexHelpers = {
  centerAll,
  rightAlign,
  leftAlign,
};
