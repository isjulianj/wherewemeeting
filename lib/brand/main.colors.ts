import { AppColors, CustomPalette } from './brand.model';

// don't export this.
const mainLightColors = {
  primaryLight: '#67AABD',
  primary: '#037083',
  primaryDark: '#014153',

  secondaryLight: '#B4EAF4',
  secondary: '#04B9D9',
  secondaryDark: '#0193C0',

  white: '#FFFFFF',
  whitesmoke: '#F9F9F9',
  primaryLighter: '#f1f7f8',
};

// colors used by all brands
const appColors: AppColors = {
  sidebar: mainLightColors.white,
  topBar: mainLightColors.primaryDark,
  contentBackground: {
    subtle: mainLightColors.whitesmoke,
    default: mainLightColors.whitesmoke,
    primary: mainLightColors.primaryLighter,
  },
};

export const colors: CustomPalette = {
  appColors,
  palette: {
    type: 'light',
    background: {
      default: mainLightColors.whitesmoke,
      paper: mainLightColors.white,
    },
    primary: {
      light: mainLightColors.primaryLight,
      main: mainLightColors.primary,
      dark: mainLightColors.primaryDark,
    },
    secondary: {
      light: mainLightColors.secondaryLight,
      main: mainLightColors.secondary,
      dark: mainLightColors.secondaryDark,
      contrastText: mainLightColors.white,
    },
    info: {
      light: mainLightColors.secondaryLight,
      main: mainLightColors.secondary,
      dark: mainLightColors.secondaryDark,
    },
  },
};
