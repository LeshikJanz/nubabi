import defaultTheme, {
  PANEL_BACKGROUND,
  PANEL_BUTTON_TEXT,
} from 'core/themes/defaultTheme';
import { mergeDeepRight } from 'ramda';
import { activityItem, shadows } from './elements';

export const bg = {
  panel: PANEL_BACKGROUND,
};

export const overlay = {
  gray3: 'rgba(116, 130, 148, .7)',
  blue0: 'rgba(51, 183, 235, .07)',
};

export const theme = mergeDeepRight(defaultTheme, {
  overlay,
  bg,
  shadows,
  activityItem,
  colors: {
    open: {
      white2: '#E9ECF4',
      red1: '#CB2E4A',
    },
    paragraph: PANEL_BUTTON_TEXT,
  },
  button: {
    borderRadius: 20,
    fontSize: 14,
  },
  paragraph: {
    color: defaultTheme.colors.open.gray3,
  },
  transition: prop => `${prop || 'all'} .2s ease`,
});

export default theme;
