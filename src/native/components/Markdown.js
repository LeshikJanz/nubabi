// @flow
import React, { createElement } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Image from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
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

export const ListItemBullet = () => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 8,
      marginLeft: -10,
      marginRight: 5,
    }}
  >
    <Icon name="ios-disc" color={theme.colors.secondary} />
  </View>
);

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

  return (
    <SimpleMarkdown styles={style} rules={ruleOverrides}>
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
    marginRight: 10,
  },
  listItem: {
    margin: 10,
    flexDirection: 'row',
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
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
};

export default Markdown;
