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
  gray: open.gray3,
  secondary: open.gray2,
};

const typography = {
  subHeaderText: {
    fontSize: 14,
    color: colors.gray,
    letterSpacing: 0.88,
    lineHeight: 16,
    fontWeight: '500',
  },
};

const theme = {
  colors,
  typography,
};

export default theme;
