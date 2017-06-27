// @flow
import type { Memory as MemoryType } from '../../common/types';
import React, { PureComponent } from 'react';
import Image from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { gql } from 'react-apollo';
import moment from 'moment';
import { Box, Card, Text } from '../components';
import theme from '../../common/themes/defaultTheme';
import MemoryMedia from './MemoryMedia';
import MemoryComments from './MemoryComments';

type Props = MemoryType & {};

class Memory extends PureComponent {
  prop: Props;
  state = {
    displayAllComments: false,
  };

  static fragments = {
    detail: gql`
      fragment MemoryItem on Memory {
        id
        author {
          avatar {
            url
          }
        }
        createdAt
        files(first: 3) {
          count
          edges {
            node {
              contentType
              url
            }
          }
        }
        comments(last: 3) {
          count
          edges {
            node {
              text
              author {
                firstName
                lastName
              }
            }
          }
        }
      }
    `,
  };

  toggleAllComments = () => {
    this.setState(({ displayAllComments }) => ({
      displayAllComments: !displayAllComments,
    }));
  };

  render() {
    const {
      author,
      comments: commentsConnection,
      files: filesConnection,
      createdAt,
    } = this.props;

    const date = moment(createdAt).format('D MMMM • H:mm').toUpperCase();

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
            <Text medium color="secondary">{date}</Text>
          </Box>

          <Box flexDirection="row" alignItems="center">
            <Icon size={20} color={theme.colors.gray} name="ios-share-alt" />
            <Icon
              size={20}
              color={theme.colors.gray}
              name="md-brush"
              style={{ marginLeft: 10 }}
            />
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
            <MemoryComments
              comments={commentsConnection}
              onExpand={this.toggleAllComments}
              expanded={this.state.displayAllComments}
            />
          </Card>
        </Box>
      </Box>
    );
  }
}

export default Memory;
