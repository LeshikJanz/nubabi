// @flow
import type { BoxProps } from './Box';
import type { Color, Theme } from '../../../core/themes/types';
import React from 'react';
import PropTypes from 'prop-types';
import colorLib from 'color';
import isReactNative from '../../../core/app/isReactNative';
import Box from './Box';

// Universal styled Text component. The same API for browsers and React Native.
// Some props are ommited or limited or set to match React Native behaviour.
// Use style prop for platform specific styling.

export type TextProps = BoxProps & {
  fontFamily?: string,
  size?: number,
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: Color,
  decoration?: 'none' | 'underline' | 'line-through',
  italic?: boolean,
  lineHeight?: number,
  // TODO: shadowColor, shadowOffset, shadowRadius.
  // Custom
  fixWebFontSmoothing?: boolean,
  medium?: boolean,
};

type TextContext = {
  Text: () => React.Element<*>,
  theme: Theme,
};

// inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
const fontSizeWithComputedLineHeight = (typography, size) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = lines * typography.lineHeight;
  return { fontSize, lineHeight };
};

export const computeTextStyle = (
  theme: Theme,
  {
    fontFamily = theme.text.fontFamily,
    size = 0,
    align,
    bold,
    medium,
    color = 'black',
    decoration,
    italic,
    lineHeight,
    ...props
  }: TextProps,
) => {
  let style = {
    ...fontSizeWithComputedLineHeight(theme.typography, size),
    color: theme.colors[color],
    fontFamily,
  };

  /* Switch to SF Pro Display font if size is greater than 16
   * (Apple recommends higher but given how our Text's are setup we chose
   * 16.
   */
  if (style.fontSize > 16) {
    style = { ...style, fontFamily: 'SF Pro Display' };
  }

  if (align) {
    style = { ...style, textAlign: align };
  }

  if (bold) {
    const bold = theme.text.bold;
    style = { ...style, fontWeight: bold };
  }

  if (medium) {
    const medium = theme.text.medium;
    style = { ...style, fontWeight: medium };
  }

  if (decoration) {
    style = { ...style, textDecoration: decoration };
  }

  if (italic) {
    style = { ...style, fontStyle: 'italic' };
  }

  if (lineHeight) {
    style = { ...style, lineHeight };
  }

  return [style, props];
};

// usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
// tldr; Fix font smoothing only for light text on dark background.
const maybeFixFontSmoothing = (color, backgroundColor) => {
  const hasColorAndBackgroundColor =
    color &&
    color !== 'transparent' &&
    backgroundColor &&
    backgroundColor !== 'transparent';
  // console.log(hasColorAndBackgroundColor);
  if (!hasColorAndBackgroundColor) {
    return null;
  }
  const colorIsLighterThanBackgroundColor =
    colorLib(color).luminosity() > colorLib(backgroundColor).luminosity();
  if (!colorIsLighterThanBackgroundColor) {
    return null;
  }
  return {
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  };
};

const computePlatformTextStyle = (boxStyle, textStyle, fixWebFontSmoothing) => {
  if (isReactNative) {
    if (textStyle.fontWeight) {
      textStyle = { ...textStyle, fontWeight: String(textStyle.fontWeight) };
    }
    if (textStyle.textDecoration) {
      textStyle = {
        ...textStyle,
        textDecorationLine: textStyle.textDecoration,
      };
      delete textStyle.textDecoration;
    }
  } else {
    textStyle = {
      ...textStyle,
      ...(fixWebFontSmoothing
        ? maybeFixFontSmoothing(textStyle.color, boxStyle.backgroundColor)
        : null),
      lineHeight: `${textStyle.lineHeight}px`, // browsers need px
    };
  }
  return textStyle;
};

const Text = (
  { as, style, fixWebFontSmoothing = true, ...props }: TextProps,
  { Text: PlatformText, theme }: TextContext,
) => {
  const [textStyle, restProps] = computeTextStyle(theme, props);
  return (
    <Box
      as={as || PlatformText}
      {...restProps}
      style={(theme, boxStyle) =>
        computePlatformTextStyle(
          boxStyle,
          {
            ...textStyle,
            ...(style && style(theme, { ...boxStyle, ...textStyle })),
          },
          fixWebFontSmoothing,
        )
      }
    />
  );
};

Text.contextTypes = {
  Text: PropTypes.func,
  theme: PropTypes.object,
};

export default Text;
