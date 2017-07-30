// @flow
import type { Memory as MemoryType } from '../../common/types';
import React, { PureComponent } from 'react';
import { LayoutAnimation, TouchableOpacity } from 'react-native';
import Image from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { gql } from 'react-apollo';
import moment from 'moment';
import { Box, Card, Text } from '../components';
import theme from '../../common/themes/defaultTheme';
import MemoryMedia, {
  fragments as MemoryMediaFragments,
} from '../components/MemoryMedia';
import MemoryComments from './MemoryComments';
import MemoryComment from './MemoryComment';

type Props = MemoryType & {
  babyId: String,
  onLoadMoreComments: () => Promise<*>,
  onEditMemory: (id: string) => void,
};

export const formatMemoryDate = (date: Date, inputDateFormat?: string) => {
  const dateStr = inputDateFormat
    ? moment(date, inputDateFormat)
    : moment(date);

  return dateStr.format('D MMMM • H:mm').toUpperCase();
};

class Memory extends PureComponent {
  prop: Props;

  state = {
    displayAllComments: false,
  };

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
      }
    `,
    form: gql`
      fragment MemoryForm on Memory {
        title
        createdAt
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
        author {
          avatar {
            url
          }
        }
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
        # comments are reversed (most-recent first)
        comments(first: 2) {
          count
          edges {
            cursor
            node {
              id
              ...MemoryComment
            }
          }
        }
      }
      ${MemoryComment.fragments.comment}
    `,
  };

  handleEditMemory = () => {
    this.props.onEditMemory(this.props.id);
  };

  toggleAllComments = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState(({ displayAllComments }) => ({
      displayAllComments: !displayAllComments,
    }));
  };

  render() {
    const {
      id,
      babyId,
      author,
      title,
      comments: commentsConnection,
      files: filesConnection,
      createdAt,
    } = this.props;

    const date = formatMemoryDate(createdAt);
    const avatar = author.avatar.url;

    return (
      <Box
        flex={1}
        contentSpacing
        paddingVertical={0}
        justifyContent="flex-start"
        style={() => ({ marginTop: -9 })}
      >
        <Box flexDirection="row" alignItems="center">
          <Image
            style={{
              width: 30,
              height: 30,
              overflow: 'hidden',
              borderRadius: 15,
              borderColor: '#CFD6DF',
              borderWidth: 2,
            }}
            source={{ uri: avatar }}
          />

          <Box flex={1} padding={1}>
            <Text medium color="secondary">
              {date}
            </Text>
          </Box>

          <Box flexDirection="row" alignItems="center">
            <Icon size={20} color={theme.colors.gray} name="ios-share-alt" />
            <Box as={TouchableOpacity} onPress={this.handleEditMemory}>
              <Icon
                size={20}
                color={theme.colors.gray}
                name="md-brush"
                style={{ marginLeft: 10 }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          flex={1}
          style={() => ({
            borderColor: '#E9ECF4',
            borderLeftWidth: 2,
            marginLeft: 15,
            marginTop: -9,
            paddingLeft: 15,
            paddingTop: 9,
          })}
        >
          <Card padding={0}>
            <MemoryMedia files={filesConnection} />
            <Box contentSpacing>
              <Text medium marginVertical={1} size={2}>
                {title}
              </Text>
            </Box>
            <MemoryComments
              comments={commentsConnection}
              memoryId={id}
              babyId={babyId}
              onLoadMore={this.toggleAllComments}
              expanded={this.state.displayAllComments}
            />
          </Card>
        </Box>
      </Box>
    );
  }
}

export default Memory;
