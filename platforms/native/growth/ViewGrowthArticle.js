// @flow
import type {
  GrowthArticle as GrowthArticleType,
  LayoutProps,
} from '../../../core/types';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { compose, path, pathOr } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import {
  Box,
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
  withLayout,
} from '../components';
import GrowthArticle from '../library/GrowthArticle';
import HeaderContainer from '../stimulation/HeaderContainer';
import HeaderImage from '../stimulation/HeaderImage';
import HeaderOverlay from '../stimulation/HeaderOverlay';
import HeaderTitle from '../stimulation/HeaderTitle';
import getHeaderStyles from '../stimulation/getHeaderStyles';
import HeaderTextSection from '../stimulation/HeaderTextSection';
import HeaderShape from '../stimulation/HeaderShape';
import HealthcareNotice from './HealthcareNotice';

type Props = {
  article: GrowthArticleType,
  layout: LayoutProps,
};

const headerImage = {
  Parenting: require('../../../core/images/section-parenting-header.png'),
  Health: require('../../../core/images/section-health-header.png'),
  default: require('../../../core/images/gross_motor_large.jpg'),
};

const headerIcon = {
  Parenting: require('../../../core/images/section-parenting-icon.png'),
  Health: require('../../../core/images/section-health-icon.png'),
};

export const ViewGrowthArticle = ({ article, layout }: Props) => {
  const { title } = article;
  const width = layout.viewportWidth;

  const {
    headerContainerStyle,
    headerImageStyle,
    overlayStyle,
  } = getHeaderStyles(width);

  const section = path(['section', 'name'], article);
  const image = headerImage[section || 'default'];

  if (section) {
    overlayStyle.backgroundColor = 'transparent';
  }

  return (
    <Box flex={1} as={ScrollView}>
      <Box backgroundColor="white">
        <HeaderContainer style={headerContainerStyle}>
          <HeaderImage source={image} style={headerImageStyle} />

          <HeaderOverlay overlayStyle={overlayStyle} />

          <HeaderTextSection width={width}>
            {section && (
              <Image
                source={headerIcon[section]}
                style={{
                  width: 36,
                  height: 24,
                  marginBottom: 16,
                  marginTop: -16,
                }}
                resizeMode="contain"
              />
            )}
            <HeaderTitle text={title} />
          </HeaderTextSection>

          <HeaderShape width={width} />

          <View style={{ flex: 1, marginTop: -8 }} />
        </HeaderContainer>

        <Box padding={1} backgroundColor="white">
          <GrowthArticle {...filter(GrowthArticle.fragments.growth, article)} />
        </Box>
      </Box>

      {section === 'Health' && <HealthcareNotice />}
    </Box>
  );
};

export default compose(
  withLayout,
  withCurrentBaby,
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
