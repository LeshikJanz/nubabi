// @flow
// TODO: remove duplication with GrowthArticle
import React from 'react';
import { gql } from 'react-apollo';
import { Box, Markdown } from '../components';
import theme from '../../common/themes/defaultTheme';

type Props = {
  text: string,
};

export const articleMarkdownStyle = {
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
  },
  heading: {
    marginVertical: 10,
    color: theme.colors.secondary,
  },
};

export const Article = ({ text }: Props) => {
  return (
    <Box flex={1}>
      <Markdown text={text} style={articleMarkdownStyle} />
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
      tags {
        # TODO: edges
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
