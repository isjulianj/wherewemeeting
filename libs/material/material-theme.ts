import { createTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const getMaterialTheme = ({ palette }: Theme) =>
    createTheme({
    palette,
  });
