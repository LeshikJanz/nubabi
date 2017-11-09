// @flow
// TODO: maybe we can get rid of this component and pass
// mode="cards" and mode="list" to ArticleList instead
// if the differences aren't too many
import type { Article as ArticleType } from '../../../core/types';
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { Card, ListSeparator } from '../components';
import ArticleListItem from './ArticleListItem';
import theme from '../../../core/themes/defaultTheme';
import { toggleNetworkActivityIndicator } from '../../../core/ui/reducer';
import withPullToRefresh from '../components/withPullToRefresh';

type Props = {
  articles: Array<ArticleType>,
  onRefresh: () => Promise<*>,
  refreshing: boolean,
  handleRefresh: () => void,
  onViewArticle: (id: string, section: string) => void,
  toggleNetworkActivityIndicator: typeof toggleNetworkActivityIndicator,
};

const keyExtractor = item => item.id;

export class ArticleList extends PureComponent {
  props: Props;

  renderItem = ({ item: article }: { item: ArticleType }) => {
    const viewArticle = () => {
      this.props.onViewArticle(article.id, path(['section', 'name'], article));
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
    const { articles, refreshing, handleRefresh } = this.props;

    return (
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={ListSeparator}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }
}

export default compose(withPullToRefresh)(ArticleList);
