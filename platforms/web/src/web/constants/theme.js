// @flow
import palx from "palx";

const palette = palx("#07c");

const flattened = Object.keys(palette).reduce((a, key) => {
  const value = palette[key];
  if (Array.isArray(value)) {
    a[key] = value[5];
    value.forEach((val, i) => {
      a[key + i] = val;
    });
  } else {
    a[key] = value;
  }
  return a;
}, {});

const colors = Object.assign({}, flattened, {
  black: "#000",
  white: "#fff"
});

const theme = {
  colors,
  font: `
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol'`
};

export default theme;
