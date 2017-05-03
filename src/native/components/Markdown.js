// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import SimpleMarkdown from 'react-native-simple-markdown';
import theme from '../../common/themes/defaultTheme';

type Props = {
  text: string,
  styles?: Object,
};

export const Markdown = ({ styles: stylesProp, text }: Props) => {
  const style = StyleSheet.flatten(styles, stylesProp);

  return (
    <SimpleMarkdown styles={style}>
      {text}
    </SimpleMarkdown>
  );
};

const styles = {
  view: {
    flex: 1,
  },
  heading1: {
    ...theme.heading,
    color: theme.colors.black,
    fontSize: 14,
    lineHeight: 20,
  },
  paragraph: {
    lineHeight: 17,
    fontSize: 12,
    marginBottom: 5,
    color: theme.colors.open.gray3,
  },
  text: {},
  link: {
    color: theme.colors.primary,
  },
  strong: {
    fontWeight: `${theme.text.bold}`,
  },
};

export default Markdown;
