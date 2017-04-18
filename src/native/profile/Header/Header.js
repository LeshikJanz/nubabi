// @flow
import type { Image, Avatar, Achievement } from '../../../common/types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pathOr } from 'ramda';
import { gql } from 'react-apollo';
import CoverImage from './CoverImage';
import IconHeader from './IconHeader';
import NameAgeRow from './NameAgeRow';
import Statistics from './Statistics';

type Props = {
  coverImage: Image,
  avatar: Avatar,
  name: String,
  dob: Date,
  achievements: Achievement[],
  onEditBaby: () => void,
};

const Header = (
  { coverImage, avatar, name, dob, achievements, onEditBaby }: Props,
) => {
  return (
    <View style={styles.container}>
      <CoverImage coverImage={coverImage} />
      <IconHeader avatar={avatar} />
      <NameAgeRow babyName={name} birthDate={dob} onEditBaby={onEditBaby} />
      <Statistics
        achievements={pathOr(0, ['count'], achievements)}
        favourites={3}
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

export default Header;
