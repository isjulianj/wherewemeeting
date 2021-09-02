import { getBrandColors, Brand } from './brand';
import { dimensions } from './settings';
import { flexHelpers } from './helpers';
import { getMaterialTheme } from './material';

export const getTheme = (brand?: Brand) => {
  const { appColors, palette } = getBrandColors(brand);
  // any because materialTheme typing expecting everything
  // eslint-disable-next-line
  const materialTheme = getMaterialTheme({ palette } as any);

  return {
    ...materialTheme,
    // Override material default: show header above drawer (sidebar)
    zIndex: {
      ...materialTheme.zIndex,
      appBar: materialTheme.zIndex.drawer,
      drawer: materialTheme.zIndex.appBar,
    },
    appColors,
    dimensions,
    flexHelpers,
  };
};

export type Theme = ReturnType<typeof getTheme>;
