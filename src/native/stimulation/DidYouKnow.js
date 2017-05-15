// @flow
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { gql } from 'react-apollo';
import { PANEL_BUTTON_TEXT } from '../../common/themes/defaultTheme';

const icon = require('../../common/images/didYouKnowIcon.png');

const defaultText = 'At this time your baby will begin to babble routinely, often amusing herself for long persion of time!';

type Props = {
  text: string,
};

const DidYouKnow = ({ text }: Props) => {
  console.log('DidYouKnow', text);
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Did you know</Text>
        <Text style={styles.body}>
          {text}
        </Text>
      </View>
    </View>
  );
};

DidYouKnow.fragments = {
  tips: gql`
    fragment DidYouKnow on Tip {
      id
      text
    }
  `,
};

DidYouKnow.defaultProps = {
  text: defaultText,
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 5,
    //width: 250,
  },
  title: {
    color: PANEL_BUTTON_TEXT,
    fontSize: 14,
    marginBottom: 5,
  },
  body: {
    fontSize: 12,
    color: '#748294',
    lineHeight: 16,
  },
  icon: {
    width: 54,
    height: 54,
    marginRight: 20,
  },
});

export default DidYouKnow;
