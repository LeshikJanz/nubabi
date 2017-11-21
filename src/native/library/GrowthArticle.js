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

export function viewGrowthArticle(id: string, section: string) {
  this.props.navigation.navigate('viewGrowthContent', { id, section });
}

export const GrowthArticle = ({ text }: Props) => {
  return (
    <Box flex={1}>
      <Markdown text={text} style={textStyle} />
    </Box>
  );
};

GrowthArticle.fragments = {
  growth: gql`
    fragment GrowthArticle on GrowthArticle {
      id
      title
      text
      readingTime {
        text
      }
      section {
        id
        name
      }
    }
  `,
  item: gql`
    fragment GrowthArticleListItem on GrowthArticle {
      id
      title
      section {
        id
        name
      }
    }
  `,
};

export default GrowthArticle;
