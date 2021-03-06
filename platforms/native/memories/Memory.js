// @flow
import type { File, Memory as MemoryType } from 'core/types';
import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import { gql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import moment from 'moment';
import { Box, Card, Icon, Pill, Text } from '../components';
import theme from 'core/themes/defaultTheme';
import { isUUID as isOptimistic } from 'core/helpers/graphqlUtils';
import MemoryMedia from '../components/MemoryMedia';
import { findSuggestedMemoryById } from './SuggestedMemoriesList';
import LikeMemoryButton from './LikeMemoryButton';
import MemoryCommentsSummary from './MemoryCommentsSummary';
import MemoryActivity from './MemoryActivity';

type Props = MemoryType & {
  id: String,
  onLoadMoreComments: () => Promise<*>,
  onViewMemory: (id: string) => void,
  onEditMemory: (id: string) => void,
  onToggleLike: () => void,
  suggestedMemoryType: string,
  files: Array<File>,
};

export const formatMemoryDate = (date: Date, inputDateFormat?: string) => {
  const dateStr = inputDateFormat
    ? moment(date, inputDateFormat)
    : moment(date);

  return dateStr.format('D MMMM • H:mm').toUpperCase();
};

class Memory extends PureComponent<Props> {
  static fragments = {
    item: gql`
      fragment MemoryListItem on Memory {
        id
        title
        files(first: 1) {
          edges {
            node {
              id
              url
              contentType
              # It seems apollo has a bug so we can't expand
              # MemoryMedia.fragments.files here and work correctly
              ... on Thumbnailable {
                thumb {
                  url
                }
              }
              ... on Audio {
                duration
              }
              ... on Video {
                duration
              }
            }
          }
        }
        suggestedMemoryType
        comments {
          count
        }
      }
    `,
    form: gql`
      fragment MemoryForm on Memory {
        id
        title
        createdAt
        suggestedMemoryType
        files {
          edges {
            node {
              id
              contentType
              url
              ... on Image {
                thumb {
                  url
                }
              }
              ... on Video {
                thumb {
                  url
                }
              }
            }
          }
        }
      }
    `,
    detail: gql`
      fragment MemoryItem on Memory {
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
        fromActivity {
          ...MemoryActivity
        }

        ...MemoryCommentsSummary
        ...LikeMemoryButton
      }
      ${MemoryCommentsSummary.fragments.summary}
      ${LikeMemoryButton.fragments.item}
      ${MemoryActivity.fragments.activity}
    `,
  };

  handleViewMemory = () => {
    this.props.onViewMemory(this.props.id);
  };

  handleEditMemory = () => {
    this.props.onEditMemory(this.props.id);
  };

  render() {
    const {
      id,
      title,
      comments: commentsConnection,
      files: filesConnection,
      suggestedMemoryType,
      createdAt,
      onToggleLike,
      fromActivity,
    } = this.props;

    const date = formatMemoryDate(createdAt);

    const mainContainerStyle = isOptimistic(id)
      ? { opacity: theme.states.disabled.opacity }
      : {};

    const cardProps = isOptimistic(id)
      ? {}
      : { onPress: this.handleViewMemory };

    const suggestedMemory = suggestedMemoryType
      ? findSuggestedMemoryById(suggestedMemoryType)
      : null;

    return (
      <Box
        flex={1}
        contentSpacing
        paddingVertical={0}
        justifyContent="flex-start"
        style={() => mainContainerStyle}
      >
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

          <Box
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Icon size={20} color={theme.colors.gray} name="ios-share-alt" />
          </Box>
        </Box>
        <Box
          flex={1}
          style={() => ({
            borderColor: '#E9ECF4',
            borderLeftWidth: 2,
            marginLeft: 15,
            paddingLeft: 15,
            paddingTop: 9,
          })}
        >
          <Card padding={0} {...cardProps}>
            <Box flexDirection="row" flex={1}>
              <MemoryMedia
                files={filesConnection}
                suggestedMemoryType={suggestedMemory}
              />
            </Box>
            <Box
              flex={1}
              contentSpacing
              borderTopWidth={1}
              style={() => ({ borderColor: '#E9ECF4' })}
            >
              <Box flexDirection="row" paddingVertical={0.3}>
                <Text medium size={2} flex={1}>
                  {title}
                </Text>
                {isOptimistic(id) ? (
                  <ActivityIndicator />
                ) : (
                  <LikeMemoryButton
                    withCount
                    onToggleLike={onToggleLike}
                    {...filter(LikeMemoryButton.fragments.item, this.props)}
                  />
                )}
              </Box>
              <Box flex={1} flexDirection="row" justifyContent="space-between">
                <MemoryCommentsSummary connection={commentsConnection} />

                {fromActivity && (
                  <MemoryActivity
                    {...filter(MemoryActivity.fragments.activity, fromActivity)}
                  />
                )}
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    );
  }
}

export default Memory;
