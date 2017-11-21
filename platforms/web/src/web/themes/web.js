import defaultTheme, {
  PANEL_BACKGROUND,
  PANEL_BUTTON_TEXT,
} from 'core/themes/defaultTheme';
import { mergeDeepRight } from 'ramda';

const shadows = {
  primary: `0 2px 4px 0 rgba(0, 0, 0, .5)`,
  light: `0 1px 0 0 ${defaultTheme.colors.open.white2}`,
  panel: `0 1px 3px 0 rgba(0, 0, 0, .15)`,
};

const bg = {
  panel: PANEL_BACKGROUND,
};

const overlay = {
  gray3: 'rgba(116, 130, 148, .7)',
  blue0: 'rgba(51, 183, 235, .07)',
};

const theme = mergeDeepRight(defaultTheme, {
  overlay,
  bg,
  shadows,
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
