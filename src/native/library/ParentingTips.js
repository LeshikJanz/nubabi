// @flow
import type {
  GraphQLDataProp,
  GrowthArticle as GrowthArticleType,
} from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { displayLoadingState, showNoContentViewIf } from '../components';
import ArticleList from './ArticleList';
import GrowthArticle from './GrowthArticle';
import { mapEdgesToProp } from '../../common/helpers/graphqlUtils';

type Props = {
  onViewArticle: () => void,
  data: GraphQLDataProp<*>,
  articles: Array<GrowthArticleType>,
};

export const ParentingTips = ({
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
      query ParentingTips {
        viewer {
          allLibraryArticles(filter: { section: "parenting"}) {
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
)(ParentingTips);
