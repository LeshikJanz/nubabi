// @flow
import type { Theme } from './types';
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
  gray0: '#E0E4E7',
  gray1: '#CFD6DF',
  gray2: '#9EABBC',
  gray3: '#748294',
  blue0: '#33B7EB',
  blue1: '#58A4FF',
  red0: '#EA3154',
  black0: '#454D56',
  black1: '#3D414B',
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
  background: open.white1,
};

const theme: Theme = {
  typography: typography({
    fontSize: 13,
    fontSizeScale: 'step1',
    lineHeight: 16,
  }),
  colors,
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
    bold: 600,
    medium: 500,
    fontFamily: 'System',
  },
  block: {
    marginBottom: 1,
    maxWidth: 21,
  },
  button: {
    borderRadius: 15,
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
  },
};

export default theme;
