// @flow
import React from 'react';
import Image from 'react-native-cached-image';
import { merge } from 'lodash';
import SimpleMarkdown from 'react-native-simple-markdown';
import theme from '../../common/themes/defaultTheme';
import Box from './Box';

type Props = {
  text: string,
  style?: Object,
};

// Needed to customize because content returns URLs with no protocol
// Also cache and style
export const imageRule = {
  image: {
    react: (node, output, state) => {
      const uri = node.target.startsWith('//')
        ? `https:${node.target}`
        : node.target;

      return (
        <Box
          key={state.key}
          margin={1}
          padding={1}
          style={() => ({ width: 320, height: 340 })}
        >
          <Image
            source={{ uri }}
            style={{ width: 320, height: 320, alignSelf: 'center' }}
          />
        </Box>
      );
    },
  },
};

export const rules = {
  ...imageRule,
};

export const Markdown = ({ style: stylesProp, text }: Props) => {
  const style = merge({}, styles, stylesProp);

  return (
    <SimpleMarkdown styles={style} rules={rules}>
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
  blockQuoteSection: {
    marginVertical: 16,
  },
};

export default Markdown;
