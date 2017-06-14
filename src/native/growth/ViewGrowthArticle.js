// @flow
import type {
  State,
  GrowthArticle as GrowthArticleType,
  LayoutProps,
} from '../../common/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { compose, path } from 'ramda';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import {
  Box,
  FAB,
  Text,
  withLayout,
  displayLoadingState,
  showNoContentViewIf,
} from '../components';
import GrowthArticle from '../library/GrowthArticle';
import HeaderContainer from '../stimulation/HeaderContainer';
import HeaderImage from '../stimulation/HeaderImage';
import HeaderOverlay from '../stimulation/HeaderOverlay';
import HeaderTitle from '../stimulation/HeaderTitle';
import getHeaderStyles from '../stimulation/getHeaderStyles';
import HeaderTextSection from '../stimulation/HeaderTextSection';
import HeaderShape from '../stimulation/HeaderShape';

type Props = {
  article: GrowthArticleType,
  layout: LayoutProps,
};

export const ViewGrowthArticle = ({ article, layout }: Props) => {
  const { title } = article;
  const width = layout.viewportWidth;

  const {
    headerContainerStyle,
    headerImageStyle,
    overlayStyle,
  } = getHeaderStyles(width);

  const image = require('../../common/images/gross_motor_large.jpg');

  return (
    <Box flex={1} as={ScrollView} backgroundColor="white">
      <HeaderContainer style={headerContainerStyle}>
        <HeaderImage source={image} style={headerImageStyle} />

        <HeaderOverlay overlayStyle={overlayStyle} />

        <HeaderTextSection width={width}>
          <HeaderTitle text={title} />
        </HeaderTextSection>

        <HeaderShape width={width} />

        <View style={{ flex: 1, marginTop: -8 }} />
      </HeaderContainer>

      <Box padding={1} backgroundColor="white">
        <GrowthArticle {...filter(GrowthArticle.fragments.growth, article)} />
      </Box>
    </Box>
  );
};

export default compose(
  withLayout,
  connect((state: State) => ({
    currentBabyId: state.babies.currentBabyId,
  })),
  graphql(
    gql`
    query ViewGrowthArticle($id: ID!, $babyId: ID!) {
      viewer {
        growthArticle(id: $id, babyId: $babyId) {
          ...GrowthArticle
        }
      }
    }
    ${GrowthArticle.fragments.growth}
  `,
    {
      options: ownProps => ({
        fetchPolicy: 'cache-and-network',
        variables: {
          id: ownProps.id,
          babyId: ownProps.currentBabyId,
        },
      }),
      props: ({ data }) => ({
        data,
        article: path(['viewer', 'growthArticle'], data),
      }),
    },
  ),
  showNoContentViewIf(props => !props.article),
  displayLoadingState,
)(ViewGrowthArticle);
