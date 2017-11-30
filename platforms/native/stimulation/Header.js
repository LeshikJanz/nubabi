// @flow
import type { Image as ImageType, LayoutProps } from 'core/types';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { gql } from 'react-apollo';
import { Pill, withLayout } from '../components';
import HeaderContainer from './HeaderContainer';
import HeaderImage from './HeaderImage';
import HeaderOverlay from './HeaderOverlay';
import HeaderShape from './HeaderShape';
import HeaderTitle from './HeaderTitle';
import HeaderTextSection from './HeaderTextSection';
import getHeaderStyles from './getHeaderStyles';

const favouritePath =
  'M17.7607179,14.1526832 L18.814,20.3690984 C18.8894872,20.8166659 18.7066667,21.2696043 18.3439744,21.5369514 C18.1387436,21.6879308 17.8945897,21.7649124 17.6504359,21.7649124 C17.4628974,21.7649124 17.2741795,21.7195589 17.1013846,21.6276584 L11.5843333,18.6928086 L6.06728205,21.6276584 C5.66979487,21.839507 5.1885641,21.8037016 4.82469231,21.5381449 C4.462,21.2707978 4.27976923,20.8184562 4.35584615,20.3702919 L5.40971795,14.1538768 L0.945948718,9.75100541 C0.623358974,9.43412757 0.508948718,8.95970595 0.646358974,8.52765405 C0.785538462,8.09560216 1.15412821,7.78111135 1.59879487,7.71546811 L7.76692308,6.80780108 L10.5269231,1.15174054 C10.7244872,0.743558919 11.1349487,0.48576 11.5837436,0.48576 C12.0337179,0.48576 12.4424103,0.743558919 12.6411538,1.15114378 L15.4011538,6.80720432 L21.5704615,7.71487135 C22.0139487,7.77991784 22.3837179,8.09500541 22.5205385,8.5270573 C22.6608974,8.95910919 22.5435385,9.43353081 22.2233077,9.75040865 L17.7607179,14.1526832 Z';

const cameraPath =
  'M21.875,3.125 L18.75,3.125 L16.66666699999999,0 L8.33333300000001,0 L6.25,3.125 L3.125,3.125 C1.354167000000004,3.125 0,4.58333333 0,6.25 L0,17.7083333 C0,19.4791667 1.354167000000004,20.8333333 3.125,20.8333333 L21.875,20.8333333 C23.64583300000001,20.8333333 25,19.4791667 25,17.7083333 L25,6.25 C25,4.58333333 23.64583300000001,3.125 21.875,3.125 L21.875,3.125 zM22.91666699999999,17.7083333 C22.91666699999999,18.3333333 22.5,18.75 21.875,18.75 L3.125,18.75 C2.5,18.75 2.083332999999996,18.3333333 2.083332999999996,17.7083333 L2.083332999999996,6.25 C2.083332999999996,5.625 2.5,5.20833333 3.125,5.20833333 L7.39583300000001,5.20833333 L9.47916699999999,2.0833333300000003 L15.625,2.0833333300000003 L17.70833300000001,5.20833333 L21.97916699999999,5.20833333 C22.5,5.20833333 23.02083300000001,5.72916667 23.02083300000001,6.25 L23.02083300000001,17.7083333 L22.91666699999999,17.7083333 zM12.5,6.25 C9.58333300000001,6.25 7.29166699999999,8.5416667 7.29166699999999,11.4583333 C7.29166699999999,14.375 9.58333300000001,16.6666667 12.5,16.6666667 C15.41666699999999,16.6666667 17.70833300000001,14.375 17.70833300000001,11.4583333 C17.70833300000001,8.5416667 15.41666699999999,6.25 12.5,6.25 L12.5,6.25 zM12.5,14.5833333 C10.72916699999999,14.5833333 9.375,13.2291667 9.375,11.4583333 C9.375,9.6875 10.72916699999999,8.3333333 12.5,8.3333333 C14.27083300000001,8.3333333 15.625,9.6875 15.625,11.4583333 C15.625,13.2291667 14.27083300000001,14.5833333 12.5,14.5833333 L12.5,14.5833333 z';

const shareIconPath =
  'M21.593001000000015,6.5345379999999995 L15.681968999999981,0.20750664000000008 C15.285169999999994,-0.2174527799999999 14.555570999999986,0.05390684999999973 14.555570999999986,0.62670607 L14.555570999999986,2.85518304 C14.555570999999986,3.06126276 14.39429100000001,3.2308625299999996 14.181810999999982,3.2539024999999997 C7.676860000000005,3.9655815299999997 2.1114279999999894,8.2881357 0.06534999999999513,14.418687299999998 C-0.33656899999999723,15.623165700000001 1.209668999999991,16.5377245 2.1299879999999973,15.6366057 L2.17094800000001,15.5962857 C5.330623000000003,12.5038099 9.639096999999992,10.7636523 14.134451000000013,10.7636523 C14.366771000000028,10.7636523 14.555570999999986,10.946052 14.555570999999986,11.1706917 L14.555570999999986,13.280768900000002 C14.555570999999986,13.8535681 15.285169999999994,14.1249277 15.681968999999981,13.699968300000002 L21.593001000000015,7.372936900000001 C21.815720999999996,7.134857200000001 21.815720999999996,6.7726177 21.593001000000015,6.5345379999999995';

type Props = {
  activityName: string,
  skillImage: ImageType,
  skillName: string,
  onToggleFavorite: () => void,
  isFavoriteActivity: boolean,
  layout: LayoutProps,
};

const Header = ({
  activityName,
  skillName,
  skillImage,
  onToggleFavorite,
  isFavoriteActivity,
  layout,
}: Props) => {
  const width = layout.viewportWidth || Dimensions.get('window').width;

  const {
    headerImageStyle,
    overlayStyle,
    headerContainerStyle,
    headerButtonsStyle,
  } = getHeaderStyles(width);

  return (
    <HeaderContainer style={headerContainerStyle}>
      <HeaderImage source={{ uri: skillImage.url }} style={headerImageStyle} />

      <HeaderOverlay overlayStyle={overlayStyle} />

      <HeaderTextSection width={width}>
        <HeaderTitle text={activityName} />
        <Pill>{skillName}</Pill>
      </HeaderTextSection>

      <HeaderShape width={width} />

      <View style={[styles.headerButtons, headerButtonsStyle]}>
        <View
          style={[
            styles.headerButton,
            { borderRightColor: '#C5CDD7', borderRightWidth: 1 },
          ]}
        >
          <TouchableOpacity onPress={onToggleFavorite}>
            <Svg style={styles.favouriteButton}>
              <Path
                d={favouritePath}
                stroke="none"
                fill={isFavoriteActivity ? '#EA3154' : '#9EABBC'}
                fill-rule="evenodd"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={styles.headerButton}>
          <Svg style={styles.cameraButton}>
            <Path
              d={cameraPath}
              stroke="none"
              fill="#9EABBC"
              fill-rule="evenodd"
            />
          </Svg>
        </View>
        <View
          style={[
            styles.headerButton,
            { borderLeftColor: '#C5CDD7', borderLeftWidth: 1 },
          ]}
        >
          <Svg style={styles.shareButton}>
            <Path
              d={shareIconPath}
              stroke="none"
              fill="#9EABBC"
              fill-rule="evenodd"
            />
          </Svg>
        </View>
      </View>
    </HeaderContainer>
  );
};

Header.fragments = {
  skillArea: gql`
    fragment HeaderSkill on SkillArea {
      name
      image {
        large {
          url
        }
      }
    }
  `,
  activity: gql`
    fragment HeaderActivity on Activity {
      name
    }
  `,
};

export const styles = StyleSheet.create({
  activityName: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 22,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  headerButtons: {
    marginTop: -8,
    backgroundColor: '#fff',
    borderColor: '#E9ECF4',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
  },
  headerButton: {
    flex: 3,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 30,
  },
  shareButton: {
    width: 22,
    height: 16,
    marginTop: 4,
  },
  cameraButton: {
    width: 25,
    height: 21,
    marginTop: 4,
  },
  favouriteButton: {
    width: 23,
    height: 22,
    marginTop: 4,
  },
});

export default withLayout(Header);
