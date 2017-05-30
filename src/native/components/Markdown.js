// @flow
import React, { createElement } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Image from 'react-native-cached-image';
import S from 'string';
import { merge, map } from 'lodash';
import SimpleMarkdown from 'react-native-simple-markdown';
import theme from '../../common/themes/defaultTheme';

type Props = {
  text: string,
  style?: Object,
};

export const ListItemNumber = ({ number }: { number: number }) => (
  <View style={styles.listItemRounded}>
    <Text style={styles.listItemRoundedNumber}>{number}</Text>
  </View>
);

export const ListItemBullet = () => <View style={styles.listItemBullet} />;

// Needed to customize because content returns URLs with no protocol
// Also cache and style
export const ruleOverrides = {
  image: {
    react: (node, output, state) => {
      const uri = node.target.startsWith('//')
        ? `https:${node.target}`
        : node.target;

      const width = Dimensions.get('window').width - 30;

      return (
        <Image
          key={state.key}
          source={{ uri }}
          style={{ alignSelf: 'center', width, height: 320 }}
          resizeMode="contain"
        />
      );
    },
  },
  list: {
    react: (node, output, state) => {
      const items = map(node.items, (item, i) => {
        let bullet;
        if (node.ordered) {
          bullet = <ListItemNumber key={state.key} number={i + 1} />;
        } else {
          bullet = <ListItemBullet key={state.key} />;
        }

        const listItemText = createElement(
          Text,
          { key: state.key + 1, style: styles.listItemText },
          output(item, state),
        );
        return createElement(
          View,
          {
            key: i,
            style: styles.listItem,
          },
          [bullet, listItemText],
        );
      });
      return createElement(View, { key: state.key, style: styles.list }, items);
    },
  },
};

export const Markdown = ({ style: stylesProp, text }: Props) => {
  const style = merge({}, styles, stylesProp);
  const markdown = S(text.replace(/&nbsp;/g, ' ')).stripTags().unescapeHTML();

  return (
    <SimpleMarkdown styles={style} rules={ruleOverrides}>
      {markdown}
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
    marginBottom: 10,
    color: theme.colors.open.gray3,
  },
  listItemText: {
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
  /* Article */
  list: {
    marginRight: 15,
  },
  listItem: {
    margin: 10,
    flexDirection: 'row',
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
    marginRight: 10,
  },
  // custom
  listItemRounded: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9ECF4',
    marginLeft: -10,
    marginRight: 10,
  },
  listItemRoundedNumber: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  listItemBullet: {
    backgroundColor: '#E9ECF4',
    height: 14,
    width: 14,
    borderRadius: 14 / 2,
    marginLeft: -10,
    marginRight: 10,
    marginTop: 7,
  },
};

export default Markdown;
