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
import { Box, Card } from '../components';
import ArticleListItem from './ArticleListItem';
import theme from '../../common/themes/defaultTheme';
import { withNetworkIndicatorActions } from '../../common/helpers/graphqlUtils';
import { toggleNetworkActivityIndicator } from '../../common/ui/reducer';
import withPullToRefresh from '../components/withPullToRefresh';

type Props = {
  articles: Array<ArticleType>,
  onRefresh: () => Promise<*>,
  refreshing: boolean,
  handleRefresh: () => void,
  onViewArticle: (id: string) => void,
  toggleNetworkActivityIndicator: typeof toggleNetworkActivityIndicator,
};

const Separator = () => <Box contentSpacing />;
const keyExtractor = item => item.id;

export class ArticleList extends PureComponent {
  props: Props;

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
    const { articles, refreshing, handleRefresh } = this.props;

    return (
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={Separator}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }
}

export default compose(withPullToRefresh)(ArticleList);
