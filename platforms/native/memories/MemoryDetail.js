// @flow
import type { MemoryDetailFragment } from 'core/types';
import React, { PureComponent } from 'react';
import { Image, LayoutAnimation, TouchableOpacity } from 'react-native';
import { AutoGrowingTextInput as TextInput } from 'react-native-autogrow-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { gql } from 'react-apollo';
import { isEmpty } from 'ramda';
import { Box, Icon, Pill, Text } from '../components';
import theme from 'core/themes/defaultTheme';
import { formatMemoryDate } from './Memory';
import MemoryMedia from '../components/MemoryMedia';
import { findSuggestedMemoryById } from './SuggestedMemoriesList';
import SuggestedMemoryCardContainer from './SuggestedMemoryCardContainer';
import LikesSummary from './LikesSummary';
import MemoryComments from './MemoryComments';
import LikeMemoryButton from './LikeMemoryButton';

type Props = MemoryDetailFragment & {
  babyId: String,
  onToggleMemoryLike: Function, // TODO
  onAddComment: Function, // TODO
};

class MemoryDetail extends PureComponent<Props> {
  static fragments = {
    detail: gql`
      fragment MemoryDetail on Memory {
        id
        title
        createdAt
        # TODO: how to combine pagination with GalleryScreen
        files {
          count
          edges {
            node {
              id
              contentType
              url

              ... on Image {
                thumb {
                  url
                }
                large {
                  url
                }
              }

              ... on Audio {
                duration
              }

              ... on Video {
                thumb {
                  url
                }
                duration
              }
            }
          }
        }

        suggestedMemoryType

        ...MemoryComments
        ...LikeMemoryButton
      }
      ${MemoryComments.fragments.detail}
      ${LikeMemoryButton.fragments.item}
    `,
  };

  state = {
    comment: '',
  };

  commentInput = null;

  handleAddComment = () => {
    if (isEmpty(this.state.comment)) {
      return;
    }
    const text = this.state.comment;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ comment: '' }, () => {
      // $FlowFixMe$
      this.commentInput.blur();
    });

    this.props.onAddComment({ text });
  };

  render() {
    const {
      id,
      babyId,
      title,
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
        keyboardShouldPersistTaps="handled"
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
              flex={1}
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
            <MemoryComments memoryId={id} babyId={babyId} />
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
              ref={ref => {
                this.commentInput = ref;
              }}
              placeholder="Write a comment"
              placeholderTextColor={theme.colors.secondary}
              onChangeText={text => this.setState({ comment: text })}
              minHeight={30}
              maxHeight={60}
            />
            <Box
              as={TouchableOpacity}
              marginLeft={0.5}
              paddingVertical={0.5}
              justifyContent="center"
              alignItems="center"
              style={() => ({ marginTop: 5 })}
              onPress={this.handleAddComment}
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
