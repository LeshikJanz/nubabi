// @flow
import type {
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
import Statistics from './Statistics';
import withLayout from '../../components/withLayout';

type Props = {
  coverImage: Image,
  avatar: Avatar,
  name: String,
  dob: Date,
  achievements?: Achievement[],
  favoriteActivities: ActivityConnection,
  onEditBaby: () => void,
};

const Header = (
  {
    coverImage,
    avatar,
    name,
    dob,
    achievements,
    onEditBaby,
    favoriteActivities,
    layout,
  }: Props,
) => {
  const width = layout.viewportWidth;

  return (
    <View style={[styles.container, { width }]}>
      <CoverImage coverImage={coverImage} />
      <IconHeader avatar={avatar} />
      <NameAgeRow babyName={name} birthDate={dob} onEditBaby={onEditBaby} />
      <Statistics
        achievements={pathOr(0, ['count'], achievements)}
        favourites={pathOr(0, ['count'], favoriteActivities)}
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
      achievements {
        count
      }
      favoriteActivities {
        count
      }
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
