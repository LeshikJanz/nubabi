// @flow
import type { Theme } from './types';
import Color from 'color';
import typography from './typography';

export const NUBABI_RED = '#ED3154';
export const NUBABI_BLUE = '#00ADEE';
export const NUBABI_YELLOW = '#FBD026';
export const VDARK_GREY = '#4e555f';
export const DARK_GREY = '#748294';
export const LIGHT_GREY = '#9EABBC';
export const HEADER_FONT_COLOR = '#3D414B';
export const FONT_COLOR = VDARK_GREY;
export const PANEL_BACKGROUND = '#f8f9fc';
export const PANEL_BUTTON_TEXT = '#454D56';

const open = {
  white0: '#FFFFFF',
  white1: '#F8F9FC',
  white2: '#E9ECF4',
  gray0: '#E0E4E7',
  gray1: '#CFD6DF',
  gray2: '#9EABBC',
  gray3: '#748294',
  blue0: '#33B7EB',
  blue1: '#58A4FF',
  red0: '#EA3154',
  red1: '#CB2E4A',
  black0: '#454D56',
  black1: '#3D414B',
};

const shadows = {
  primary: `0 2px 4px 0 rgba(0, 0, 0, .5)`,
  light: `0 1px 0 0 ${open.white2}`,
  panel: `0 1px 3px 0 rgba(0, 0, 0, .15)`
};

const bg = {
  panel: PANEL_BACKGROUND,
};

const overlay = {
  gray3: 'rgba(116, 130, 148, .7)',
  blue0: 'rgba(51, 183, 235, .07)',
};

const colors = {
  open, // TODO: consider an OpenColor instance here.
  primary: open.red0,
  success: open.blue1,
  warning: '', // TODO
  danger: open.red0,
  black: open.black0,
  white: open.white0,
  gray: open.gray2,
  secondary: open.gray3,
  panel: open.white1,
  separator: open.gray0,
  paragraph: PANEL_BUTTON_TEXT,
  // This is Apple's recommended background, we're not using it yet
  background: Color('#F8F8F8').alpha(0.8).toString(),
};

const theme: Theme = {
  typography: typography({
    fontSize: 13,
    fontSizeScale: 'step1',
    lineHeight: 16,
  }),
  overlay,
  colors,
  shadows,
  bg,
  contentSpacing: {
    padding: 0.625,
  },
  states: {
    active: {
      darken: 0.2,
      opacity: 0.7,
    },
    disabled: {
      opacity: 0.5,
    },
  },
  text: {
    bold: 700,
    medium: 500,
    light: 300,
    fontFamily: 'SF Pro Text',
  },
  block: {
    marginBottom: 1,
    maxWidth: 21,
  },
  button: {
    borderRadius: 20,
    fontSize: 14,
  },
  heading: {
    fontFamily: 'System',
    marginBottom: 1,
    letterSpacing: -0.88,
  },
  subheader: {
    /* legacy */
    fontSize: 14,
    color: colors.open.gray3,
    letterSpacing: 0.88,
    fontWeight: '500',
    lineHeight: 16,
  },
  paragraph: {
    marginBottom: 1,
    color: colors.open.gray3,
  },
  transition: (prop) => `${prop || 'all'} .2s ease`,
};

export default theme;
