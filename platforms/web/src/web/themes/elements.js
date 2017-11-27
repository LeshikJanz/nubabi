import defaultTheme from 'core/themes/defaultTheme';

export const shadows = {
  primary: `0 2px 4px 0 rgba(0, 0, 0, .5)`,
  light: `0 1px 0 0 ${defaultTheme.colors.open.white2}`,
  panel: `0 1px 3px 0 rgba(0, 0, 0, .15)`,
};

export const activityItem = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  boxShadow: shadows.panel,
  background: defaultTheme.colors.white,
  borderRadius: '4px',
  marginBottom: '30px',
  display: 'flex',
  flexDirection: 'row',
  maxHeight: '119px',
};

export const checkbox = {
  rounded: {},
  squared: {},
};
