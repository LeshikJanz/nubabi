// @flow
// TODO: reuse HorizontalCardList
import type { DataSource } from 'react-native';
import type { Article } from '../../common/types';
import React, { PureComponent } from 'react';
import { ListView, TouchableOpacity } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import {
  Box,
  Card,
  Text,
  displayLoadingState,
  showNoContentViewIf,
} from '../components';
import { mapEdgesToProp } from '../../common/helpers/graphqlUtils';
import ArticleCardItem from './ArticleCardItem';
import ArticleListItem from './ArticleListItem';

type Props = {
  articles: Array<Article>,
  onBrowseAll: () => void,
  onViewArticle: (id: string) => void,
};

type State = {
  ds: DataSource,
};
export class ArticleList extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      ds: ds.cloneWithRows(props.articles),
      shouldScrollToBottom: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.articles !== this.props.articles) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.articles),
      });
    }
  }

  renderRow = (article: Article) => {
    if (!article) {
      return null;
    }

    const onViewArticle = () => {
      this.props.onViewArticle(article.id, article.title);
    };

    return (
      <Card
        padding={0}
        margin={0}
        justifyContent="flex-start"
        onPress={onViewArticle}
      >
        <ArticleCardItem
          key={article.id}
          {...filter(ArticleListItem.fragments.item, article)}
        />
      </Card>
    );
  };

  renderSeparator() {
    return <Box flex={1} marginHorizontal={0.5} />;
  }

  renderHeader = () => {
    return (
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={1}
      >
        <Text size={6}>Articles</Text>
        <TouchableOpacity onPress={this.props.onBrowseAll}>
          <Text medium color="primary">
            SEE ALL
          </Text>
        </TouchableOpacity>
      </Box>
    );
  };

  render() {
    return (
      <Box flex={1}>
        {this.renderHeader()}
        <ListView
          contentContainerStyle={{ paddingHorizontal: 10 }}
          dataSource={this.state.ds}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          horizontal
          initialListSize={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </Box>
    );
  }
}

export default compose(
  graphql(
    gql`
    query ArticleList {
      viewer {
        allArticles(first: 5) {
          edges {
            node {
              ...ArticleListItem,
            }
          }
        }
      }
    }
    ${ArticleListItem.fragments.item}
  `,
    {
      options: {
        fetchPolicy: 'cache-and-network',
      },
      props: mapEdgesToProp('viewer.allArticles.edges', 'articles'),
    },
  ),
  showNoContentViewIf(props => !props.articles),
  displayLoadingState,
)(ArticleList);
