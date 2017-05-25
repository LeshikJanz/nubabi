// @flow
import React from 'react';
import { gql } from 'react-apollo';

type Props = {};

export const Article = () => {
  return null;
};

Article.fragments = {
  item: gql`
    fragment ArticleItem on Article {
      id
    }
  `,
};

export default Article;
