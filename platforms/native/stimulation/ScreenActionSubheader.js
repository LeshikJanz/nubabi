// @flow
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { memoize } from 'ramda';
import { Icon } from '../components';
import theme from 'core/themes/defaultTheme';

type Props = {
  leftIcon: string,
  leftTitle: string | Array<string>,
  rightIcon: string,
  rightTitle: string | Array<string>,
  onLeftPress: () => void,
  onRightPress: () => void,
};

const makeText = memoize((text: string | Array<string>) => {
  const title = Array.isArray(text) ? text : [text];

  return title.map((content, index) => {
    return (
      // FIXME: don't use array keyss
      // eslint-disable-next-line react/no-array-index-key
      <Text key={index} style={theme.subheader}>
        {content}
      </Text>
    );
  });
});

export const ScreenActionSubheader = ({
  leftIcon,
  leftTitle,
  onLeftPress,
  rightIcon,
  rightTitle,
  onRightPress,
}: Props) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onLeftPress} style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <View style={styles.icon}>
              <Icon name={leftIcon} size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.textContainer}>{makeText(leftTitle)}</View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRightPress} style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <View style={styles.icon}>
              <Icon name={rightIcon} size={20} color={theme.colors.primary} />
            </View>

            <View style={styles.textContainer}>{makeText(rightTitle)}</View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 68,
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  container: {
    flex: 2,
    height: 66,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',

    borderColor: '#E9ECF4',
    borderLeftWidth: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 30,
    marginRight: 20,
  },
});

export default ScreenActionSubheader;
