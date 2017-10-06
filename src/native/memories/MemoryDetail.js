// @flow
import type { Memory as MemoryType } from '../../common/types';
import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { AutoGrowingTextInput as TextInput } from 'react-native-autogrow-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { gql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { Box, Icon, Pill, Text } from '../components';
import theme from '../../common/themes/defaultTheme';
import { formatMemoryDate } from './Memory';
import MemoryMedia from '../components/MemoryMedia';
import { findSuggestedMemoryById } from './SuggestedMemories';
import SuggestedMemoryCardContainer from './SuggestedMemoryCardContainer';
import LikesSummary from './LikesSummary';

type Props = MemoryType & {
  babyId: String,
  onToggleMemoryLike: Function, // TODO
};

class MemoryDetail extends PureComponent {
  prop: Props;

  state = {
    comment: '',
  };

  render() {
    const {
      id,
      babyId,
      title,
      comments: commentsConnection,
      files: filesConnection,
      likes: likesConnection,
      isLikedByViewer,
      suggestedMemoryType,
      createdAt,
      onToggleMemoryLike,
    } = this.props;

    const date = formatMemoryDate(createdAt);

    const suggestedMemory = suggestedMemoryType
      ? findSuggestedMemoryById(suggestedMemoryType)
      : null;

    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        extraHeight={79}
      >
        <Box flex={1}>
          <Box flex={1} contentSpacing>
            <Box flexDirection="row" alignItems="center">
              <Pill
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 5,
                  paddingHorizontal: 7,
                  borderColor: '#E9ECF4',
                  zIndex: 999,
                }}
              >
                <Text medium style={() => ({ color: theme.colors.open.gray3 })}>
                  {date}
                </Text>
              </Pill>
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              borderColor="separator"
              borderBottomWidth={1}
              paddingVertical={1}
            >
              {suggestedMemory && (
                <SuggestedMemoryCardContainer
                  marginLeft={0}
                  alignItems="flex-start"
                >
                  <Image
                    source={suggestedMemory.image}
                    style={{ width: 52, height: 52 }}
                    resizeMode="contain"
                  />
                </SuggestedMemoryCardContainer>
              )}
              <Box
                justifyContent="center"
                paddingVertical={1}
                paddingHorizontal={suggestedMemory ? 1 : 0}
                alignItems="flex-start"
              >
                <Text
                  medium
                  size={3}
                  flex={1}
                  style={() => ({
                    lineHeight: 24,
                    letterSpacing: 0.19,
                    textAlign: suggestedMemory ? 'left' : 'center',
                  })}
                >
                  {title}
                </Text>
              </Box>
            </Box>
            <Box style={() => ({ flex: 1, height: 200 })} paddingTop={1}>
              <MemoryMedia files={filesConnection} isDetailed />
            </Box>
          </Box>
          <Box flex={1}>
            <LikesSummary
              id={id}
              likes={likesConnection}
              isLikedByViewer={isLikedByViewer}
              onToggleLike={onToggleMemoryLike}
            />
          </Box>
        </Box>
        <Box
          justifyContent="flex-end"
          paddingLeft={0.5}
          style={() => ({
            backgroundColor: '#EFEFF4',
            paddingRight: 10,
          })}
        >
          <Box flexDirection="row" alignItems="center">
            <TextInput
              style={{
                fontFamily: 'SF Pro Text',
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
                borderColor: '#E9ECF4',
                paddingHorizontal: 7,
                borderWidth: 1,
                backgroundColor: '#fff',
                borderRadius: 4,
              }}
              value={this.state.comment}
              placeholder="Write a comment"
              placeholderTextColor={theme.colors.secondary}
              onChangeText={text => this.setState({ comment: text })}
              minHeight={30}
              maxHeight={60}
            />
            <Box
              marginLeft={0.5}
              paddingVertical={0.5}
              justifyContent="center"
              alignItems="center"
              style={() => ({ marginTop: 5 })}
            >
              <Icon name="md-send" size={24} color={theme.colors.secondary} />
            </Box>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    );
  }
}

export default MemoryDetail;
