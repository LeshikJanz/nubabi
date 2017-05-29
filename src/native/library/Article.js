// @flow
// TODO: remove duplication with GrowthArticle
import React from 'react';
import { gql } from 'react-apollo';
import { Box, Markdown } from '../components';

type Props = {
  text: string,
};

const textStyle = {
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
  },
};

export const Article = ({ text }: Props) => {
  return (
    <Box flex={1}>
      <Markdown text={text} style={textStyle} />
    </Box>
  );
};

Article.fragments = {
  article: gql`
    fragment Article on Article {
      id
      title
      text
      readingTime {
        text
      }
      author {
        name
      }
      publishedAt
      tags { # TODO: edges
        id
        name
      }
      image {
        url
      }
    }
  `,
};

export default Article;
