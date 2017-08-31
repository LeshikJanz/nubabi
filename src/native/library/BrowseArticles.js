// @flow
import type { Article, GraphQLDataProp } from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { displayLoadingState, showNoContentViewIf } from '../components';
import ArticleList from './ArticleList';
import ArticleListItem from './ArticleListItem';
import {
  mapEdgesToProp,
  withNetworkIndicator,
  withNetworkIndicatorActions,
} from '../../common/helpers/graphqlUtils';
import { toggleNetworkActivityIndicator } from '../../common/ui/reducer';

type Props = {
  data: GraphQLDataProp<*>,
  articles: Array<Article>,
  onViewArticle: () => void,
  toggleNetworkActivityIndicator: typeof toggleNetworkActivityIndicator,
};

export const BrowseArticles = ({
  articles,
  onViewArticle,
  toggleNetworkActivityIndicator,
  data: { refetch },
}: Props) => {
  return (
    <ArticleList
      articles={articles}
      onViewArticle={onViewArticle}
      onRefresh={withNetworkIndicator(toggleNetworkActivityIndicator, refetch)}
    />
  );
};

export default compose(
  withNetworkIndicatorActions,
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
