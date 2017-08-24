// @flow
import type { GraphQLDataProp, Article } from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { graphql, gql } from 'react-apollo';
import { showNoContentViewIf, displayLoadingState } from '../components';
import ArticleList from './ArticleList';
import ArticleListItem from './ArticleListItem';
import { mapEdgesToProp } from '../../common/helpers/graphqlUtils';

type Props = {
  onViewArticle: () => void,
  data: GraphQLDataProp<*>,
  articles: Array<Article>,
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
