// @flow
import type { Article, GraphQLDataProp } from 'core/types';
import React from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { displayLoadingState, showNoContentViewIf } from '../components';
import ArticleList from './ArticleList';
import ArticleListItem from './ArticleListItem';
import { mapEdgesToProp } from 'core/helpers/graphqlUtils';

type Props = {
  data: GraphQLDataProp<*>,
  articles: Array<Article>,
  onViewArticle: () => void,
};

export const BrowseArticles = ({
  articles,
  onViewArticle,
  data: { refetch },
}: Props) => {
  return (
    <ArticleList
      articles={articles}
      onViewArticle={onViewArticle}
      onRefresh={refetch}
    />
  );
};

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
