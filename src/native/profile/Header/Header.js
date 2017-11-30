// @flow
import type {
  LayoutProps,
  Image,
  Avatar,
  Achievement,
  ActivityConnection,
} from '../../../common/types';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { pathOr } from 'ramda';
import { gql } from 'react-apollo';
import CoverImage from './CoverImage';
import IconHeader from './IconHeader';
import NameAgeRow from './NameAgeRow';
import Measurements from './Measurements';
import withLayout from '../../components/withLayout';

type Props = {
  coverImage: ?Image,
  avatar: ?Avatar,
  name: string,
  dob: string,
  height: number,
  weight: number,
  weightUnit: 'kg' | 'lbs',
  heightUnit: 'cm' | 'in',
  onEditBaby: () => void,
  layout: LayoutProps,
};

const Header = ({
  coverImage,
  avatar,
  name,
  dob,
  height,
  weight,
  heightUnit,
  weightUnit,
  onEditBaby,
  layout,
}: Props) => {
  const width = layout.viewportWidth;

  return (
    <View style={[styles.container, { width }]}>
      <CoverImage coverImage={coverImage} />
      <IconHeader avatar={avatar} />
      <NameAgeRow babyName={name} birthDate={dob} onEditBaby={onEditBaby} />
      <Measurements
        height={height}
        weight={weight}
        heightUnit={heightUnit}
        weightUnit={weightUnit}
      />
    </View>
  );
};

Header.fragments = {
  header: gql`
    fragment Header on Baby {
      name
      coverImage {
        url
      }
      avatar {
        url
      }
      dob
      height
      weight
    }
  `,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    height: 210,
    paddingBottom: 10,
  },
});

export default withLayout(Header);
