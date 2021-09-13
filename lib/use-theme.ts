import { useTheme as useThemeReact } from '@emotion/react';
import { Theme } from './theme';

export const useTheme = () => useThemeReact() as Theme;
