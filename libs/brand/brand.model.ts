import { ThemeOptions } from '@material-ui/core';

export interface AppColors {
  sidebar: string;
  topBar: string;
  contentBackground: {
    subtle: string;
    default: string;
    primary?: string;
  };
}

export interface CustomPalette extends Pick<ThemeOptions, 'palette'> {
  appColors: AppColors;
}
