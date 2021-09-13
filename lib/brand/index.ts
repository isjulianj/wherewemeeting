import { colors as mainColors } from './main.colors';
import { colors as mainDarkColors } from './main-dark.colors';


export enum ViewModes {

  MainLight = 'main-light',
  MainDark = 'main-Dark',
}

export type Brand =
  | ViewModes.MainLight
  | ViewModes.MainDark
  | undefined;

export const getBrandColors = (brand?: Brand) => {
  switch (brand) {
    case ViewModes.MainLight:
      return mainColors;
    case ViewModes.MainDark:
      return mainDarkColors;
    default:
      return mainColors;
  }
};
