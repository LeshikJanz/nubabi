// @flow
import React from 'react';
import { LayoutAnimation, TouchableOpacity } from 'react-native';
import { Box, HorizontalCardList, Icon, Text } from '../components';
import { compose, find, propEq } from 'ramda';
import { connect } from 'react-redux';
import theme from 'core/themes/defaultTheme';
import SuggestedMemory from './SuggestedMemory';
import { setSettingsValue } from 'core/settings/reducer';
import * as stickers from './stickersMap';

type Props = {
  onAddMemory: (title?: string) => void,
  onDismiss: () => void,
};

type HeaderProps = {
  onDismiss?: () => void,
  centered: boolean,
};

export type SuggestedMemoryType = {
  id: string,
  title: string,
  image: number,
};

export const suggestedMemories = [
  stickers.solidFood,
  stickers.bathTime,
  stickers.firstSmile,
  stickers.firstBirthday,
  stickers.firstTooth,
  stickers.sleptThrough,
];

export const stickersList = [
  stickers.bathTime,
  stickers.firstSit,
  stickers.solidFood,
  stickers.firstCrawl,
  stickers.firstStand,
  stickers.firstWalk,
  stickers.firstMama,
  stickers.firstDada,
  stickers.sleptThrough,
  stickers.firstTooth,
  stickers.heart,
  stickers.firstSmile,
  stickers.cake,
  stickers.firstBirthday,
  stickers.birthday2,
  stickers.birthday3,
  stickers.kisses,
  stickers.park,
  stickers.swimming,
  stickers.holiday,
];

export const findSuggestedMemoryById = (id: string) => {
  return find(propEq('id', id), stickersList);
};

export const renderHeader = ({ onDismiss, centered = false }: HeaderProps) => (
  <Box contentSpacing flexDirection="row" alignItems="center">
    <Text flex={1} bold color="secondary" align={centered ? 'center' : 'left'}>
      SUGGESTED MEMORIES
    </Text>
    {onDismiss && (
      <TouchableOpacity onPress={onDismiss}>
        <Icon name="ios-close" size={24} color={theme.colors.secondary} />
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
