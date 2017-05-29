// @flow
import type { Article as ArticleType, LayoutProps } from '../../common/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { compose, path } from 'ramda';
import { graphql, gql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import moment from 'moment';
import {
  Box,
  withLayout,
  displayLoadingState,
  showNoContentViewIf,
} from '../components';
import theme from '../../common/themes/defaultTheme';
import Article from '../library/Article';
import HeaderContainer from '../stimulation/HeaderContainer';
import HeaderImage from '../stimulation/HeaderImage';
import HeaderOverlay from '../stimulation/HeaderOverlay';
import HeaderTitle from '../stimulation/HeaderTitle';
import getHeaderStyles from '../stimulation/getHeaderStyles';
import HeaderTextSection from '../stimulation/HeaderTextSection';
import HeaderShape from '../stimulation/HeaderShape';
import ReadingTime from './ReadingTime';
import ArticleInfoText from './ArticleInfoText';
import ArticleTags from './ArticleTags';
import ShareButton from './ShareButton';

type Props = {
  id: string,
  article: ArticleType,
  layout: LayoutProps,
};

export const ViewArticle = ({ article, layout }: Props) => {
  const { title } = article;
  const width = layout.viewportWidth;
  const readingTime = parseInt(article.readingTime.text.match(/\d+/)[0], 10);

  const publishedAt = moment(article.publishedAt).format('D MMM YYYY');

  const {
    headerContainerStyle,
    headerImageStyle,
    overlayStyle,
  } = getHeaderStyles(width);

  const image = article.image.url;

  const shareTitle = 'Share Nubabi Article';
  const shareMessage = `Read "${article.title}" on Nubabi`;
  const shareUrl = `nubabi://articles/${article.id}`;

  // TODO: where to get tags
  return (
    <Box flex={1} as={ScrollView} backgroundColor="white">
      <HeaderContainer style={headerContainerStyle}>
        <HeaderImage source={{ uri: image }} style={headerImageStyle} />

        <HeaderOverlay overlayStyle={{ ...overlayStyle, opacity: 0.6 }} />

        <HeaderTextSection width={width} style={{ marginTop: -202 }}>
          <HeaderTitle text={title} />
          <Box flexDirection="row" justifyContent="space-between" padding={1}>
            <ArticleInfoText icon="md-person">
              {article.author.name}
            </ArticleInfoText>
            <ArticleInfoText icon="md-calendar">
              {publishedAt}
            </ArticleInfoText>
          </Box>
        </HeaderTextSection>

        <HeaderShape width={width} fillShape={theme.colors.open.white1} />

        <ReadingTime minutes={readingTime} />
        <ShareButton url={shareUrl} title={shareTitle} message={shareMessage} />
        <ArticleTags tags={article.tags} />
      </HeaderContainer>

      <Box padding={1} backgroundColor="white">
        <Article {...filter(Article.fragments.article, article)} />
      </Box>
    </Box>
  );
};

export default compose(
  withLayout,
  graphql(
    gql`
      query ViewArticle($id: ID!) {
        viewer {
          article(id: $id) {
            ...Article
          }
        }
      }
      ${Article.fragments.article}
    `,
    {
      options: ownProps => ({
        fetchPolicy: 'cache-and-network',
        variables: {
          id: ownProps.id,
        },
      }),
      props: ({ data }) => ({
        data,
        article: path(['viewer', 'article'], data),
      }),
    },
  ),
  showNoContentViewIf(props => !props.article),
  displayLoadingState,
)(ViewArticle);
