// @flow
import type {
  GraphQLDataProp,
  GrowthArticle as GrowthArticleType,
} from 'core/types';
import React from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { displayLoadingState, showNoContentViewIf } from '../components';
import ArticleList from './ArticleList';
import GrowthArticle from './GrowthArticle';
import { mapEdgesToProp } from 'core/helpers/graphqlUtils';

type Props = {
  onViewArticle: (id: string, section: string) => void,
  data: GraphQLDataProp<*>,
  articles: Array<GrowthArticleType>,
};

export const HealthHelp = ({
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
      query HealthHelp {
        viewer {
          allLibraryArticles(filter: { section: "health"}) {
            edges {
              node {
                ...GrowthArticleListItem
              }
            }
          }
        }
      }
      ${GrowthArticle.fragments.item}
    `,
    {
      options: {
        fetchPolicy: 'cache-and-network',
      },
      props: mapEdgesToProp('viewer.allLibraryArticles', 'articles'),
    },
  ),
  showNoContentViewIf(props => !props.articles),
  displayLoadingState,
)(HealthHelp);
