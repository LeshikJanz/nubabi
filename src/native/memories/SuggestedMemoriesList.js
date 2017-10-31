// @flow
import React from 'react';
import { LayoutAnimation, TouchableOpacity } from 'react-native';
import { Box, HorizontalCardList, Icon, Text } from '../components';
import { compose, find, propEq } from 'ramda';
import { connect } from 'react-redux';
import theme from '../../common/themes/defaultTheme';
import SuggestedMemory from './SuggestedMemory';
import { setSettingsValue } from '../../common/settings/reducer';

type Props = {
  onAddMemory: (title?: string) => void,
  onDismiss: () => void,
};

export type SuggestedMemoryType = {
  id: string,
  title: string,
  image: number,
};

export const suggestedMemories = [
  {
    id: 'solid-food',
    title: 'First Solid Food',
    image: require('../../common/images/memories/first-solid-food.png'),
  },
  {
    id: 'bath-time',
    title: 'Bath Time',
    image: require('../../common/images/memories/bath-time.png'),
  },
  {
    id: 'first-smile',
    title: 'First Smile',
    image: require('../../common/images/memories/first-smile.png'),
  },
  {
    id: 'first-birthday',
    title: 'First Birthday',
    image: require('../../common/images/memories/first-birthday.png'),
  },
  {
    id: 'first-tooth',
    title: 'First Tooth',
    image: require('../../common/images/memories/first-tooth.png'),
  },
  {
    id: 'slept-through',
    title: 'Slept Through',
    image: require('../../common/images/memories/slept-through.png'),
  },
];

export const findSuggestedMemoryById = (id: string) =>
  find(propEq('id', id), suggestedMemories);

export const renderHeader = ({ onDismiss, centered = false }) => (
  <Box contentSpacing flexDirection="row" alignItems="center">
    <Text flex={1} bold color="secondary" align={centered ? 'center' : 'left'}>
      SUGGESTED MEMORIES
    </Text>
    {onDismiss && (
      <TouchableOpacity onPress={onDismiss}>
        <Icon name="ios-close" size={20} color={theme.colors.secondary} />
      </TouchableOpacity>
    )}
  </Box>
);

export const SuggestedMemories = ({ onAddMemory, onDismiss }: Props) => {
  // TODO: remove bound function
  return (
    <Box backgroundColor="white">
      <HorizontalCardList
        items={suggestedMemories}
        headerTitle="SUGGESTED MEMORIES"
        headerTitleStyle={{
          fontSize: 12,
          fontWeight: 'bold',
          color: theme.colors.open.gray2,
        }}
        renderRow={item => (
          <SuggestedMemory {...item} onAddMemory={onAddMemory} />
        )}
        renderHeader={() => renderHeader({ onDismiss })}
      />
    </Box>
  );
};

export default compose(
  connect(null, dispatch => ({
    onDismiss: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(setSettingsValue(['memories', 'displaySuggestions'], false));
    },
  })),
)(SuggestedMemories);
