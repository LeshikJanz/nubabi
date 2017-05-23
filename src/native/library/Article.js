// @flow
import React from 'react';
import { Box, Markdown } from '../components';
import { gql } from 'react-apollo';

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
  growth: gql`
    fragment GrowthArticle on GrowthArticle {
      id
      title
      text
    }
  `,
};

export default Article;
