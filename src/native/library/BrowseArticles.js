// @flow
// TODO: maybe we can get rid of this component and pass
// mode="cards" and mode="list" to ArticleList instead
// if the differences aren't too many
import type {
  Article as ArticleType,
  GraphQLDataProp,
} from '../../common/types';
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import {
  Box,
  Card,
  displayLoadingState,
  showNoContentViewIf,
} from '../components';
import ArticleListItem from './ArticleListItem';
import mapEdgesToProp from '../shared/mapEdgesToProp';
import theme from '../../common/themes/defaultTheme';

type Props = {
  articles: Array<ArticleType>,
  data: GraphQLDataProp<*>,
  onViewArticle: id => void,
};

const Separator = () => <Box contentSpacing />;
const keyExtractor = item => item.id;

export class BrowseArticles extends PureComponent {
  props: Props;
  state = {
    refreshing: false,
  };

  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.data.refetch().then(() => {
        this.setState({ refreshing: false });
      });
    });
  };

  renderItem = ({ item: article }: { item: ArticleType }) => {
    const viewArticle = () => {
      this.props.onViewArticle(article.id);
    };

    return (
      <Card
        margin={theme.contentSpacing.padding}
        padding={0}
        marginBottom={0}
        onPress={viewArticle}
      >
        <ArticleListItem
          {...filter(ArticleListItem.fragments.item, article)}
          onViewArticle
        />
      </Card>
    );
  };

  render() {
    const { articles } = this.props;
    return (
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={Separator}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

export default compose(
  graphql(
    gql`
      query BrowseArticles {
        viewer {
          allArticles {
            edges {
              node {
                ...ArticleListItem
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
      props: mapEdgesToProp('viewer.allArticles', 'articles'),
    },
  ),
  showNoContentViewIf(props => !props.articles),
  displayLoadingState,
)(BrowseArticles);
