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

type Props = {
  articles: Array<ArticleType>,
  onRefresh: () => Promise<*>,
  onViewArticle: (id: string) => void,
};

const Separator = () => <Box contentSpacing />;
const keyExtractor = item => item.id;

export class ArticleList extends PureComponent {
  props: Props;
  state = {
    refreshing: false,
  };

  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.onRefresh().then(() => {
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

export default ArticleList;
