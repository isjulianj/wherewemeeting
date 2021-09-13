import { css } from '@emotion/react';

export const globalCSS = css`
  /*
 * Set the global box-sizing state to border-box.
 *
 * css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice
 * paulirish.com/2012/box-sizing-border-box-ftw
 */

  #__next {
    height: 100%;
    /* to prevent scrollbar next to topbar and tabbar */
    overflow: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
  }

  body {
    height: 100%;
    line-height: 1.2;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Roboto', sans-serif;
    background-color: #ecedef;
  }
`;
