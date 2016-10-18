import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import CoverImage from './coverImage';
import IconHeader from './iconHeader';
import NameAgeRow from './nameAgeRow';
import Statistics from './statistics';

const Header = ({ coverImage, avatar, babyName, birthDate, onEditBaby }) => {
  return (
    <View style={styles.container}>
      <CoverImage coverImage={coverImage} />
      <IconHeader avatar={avatar} />
      <NameAgeRow
        babyName={babyName}
        birthDate={birthDate}
        onEditBaby={onEditBaby}
      />
      <Statistics
        achievements={6}
        favourites={3}
      />
    </View>
  );
};

Header.propTypes = {
  coverImage: React.PropTypes.number.isRequired,
  avatar: React.PropTypes.number.isRequired,
  babyName: React.PropTypes.string.isRequired,
  birthDate: React.PropTypes.string.isRequired,
  onEditBaby: React.PropTypes.func.isRequired,
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
