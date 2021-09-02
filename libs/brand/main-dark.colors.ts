import { darken } from 'polished';
import { AppColors, CustomPalette } from './brand.model';

// don't export this.
const mainDarkColors = {
  grayLight: '#3C3F4C',
  grayMiddle: '#282A32',
  grayDark: '#141416',
  white: '#FFFFFF',

  primaryLight: '#ABE3DF',
  primary: '#57C6BF',
  primaryDark: '#3CB1A9',

  secondaryLight: '#C5E4FE',
  secondary: '#5BA7FC',
  secondaryDark: '#5BA7FC',
};

const appColors: AppColors = {
  sidebar: '#27262C',
  topBar: '#313134',
  contentBackground: {
    subtle: darken(0.11, mainDarkColors.grayLight),
    default: mainDarkColors.grayLight,
    primary: mainDarkColors.grayDark,
  },
};

export const colors: CustomPalette = {
  appColors,
  palette: {
    type: 'dark',
    background: {
      default: mainDarkColors.grayDark,
      paper: mainDarkColors.grayMiddle,
    },
    text: {
      primary: mainDarkColors.white,
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      light: mainDarkColors.primaryLight,
      main: mainDarkColors.primary,
      dark: mainDarkColors.primaryDark,
    },
    secondary: {
      light: mainDarkColors.secondaryLight,
      main: mainDarkColors.secondary,
      dark: mainDarkColors.secondaryDark,
    },
  },
};
