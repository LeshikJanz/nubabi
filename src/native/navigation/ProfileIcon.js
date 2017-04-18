// @flow
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import type { ImageSource } from 'react-native';
import { compose, path } from 'ramda';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import color from 'color';

const babyIcon = require('../../common/images/face_icon.jpg');

type Props = {
  avatarSource?: ImageSource,
  active: boolean,
  tintColor: string,
};

const ProfileIcon = ({ avatarSource = babyIcon, active, tintColor }: Props) => {
  const activeStyle = active
    ? {
        borderColor: color(tintColor).alpha(0.6).string(),
        borderWidth: 2,
      }
    : {};

  return (
    <View style={styles.tabIconOuterView}>
      <View style={[styles.tabIconInnerView]}>
        <View style={[styles.tabIconInnerImageHolder, activeStyle]}>
          <Image
            source={avatarSource}
            style={[styles.tabIconImage]}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.tabSquare} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabIconOuterView: {
    width: 80,
    borderWidth: 1,
    borderColor: '#e6e9f0',
    height: 80,
    top: 5,
    borderRadius: 80 / 2,
    padding: 13,
    margin: 0,
    backgroundColor: '#fff',
    zIndex: -3,
  },
  tabIconInnerView: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    padding: 2,
    margin: 0,
    backgroundColor: '#fff',
    marginTop: -7,
    zIndex: 300,
  },
  tabIconInnerImageHolder: {
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    padding: 2,
    borderRadius: 48 / 2,
    zIndex: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    resizeMode: 'stretch',
    zIndex: 300,
  },
  tabSquare: {
    width: 90,
    height: 60,
    backgroundColor: '#fff',
    marginTop: -48,
    marginLeft: -20,
    zIndex: -2,
  },
});

export default compose(
  connect(({ babies: { currentBabyId } }) => ({ currentBabyId })),
  graphql(
    gql`
   query getBabyAvatar($id: ID!) {
     viewer {
       baby(id: $id) {
         id
         avatar {
           url
         }
       }
     }
   } 
  `,
    {
      options: ({ currentBabyId }) => ({
        variables: { id: currentBabyId },
      }),
      props: ({ data }) => {
        const avatar = path(['viewer', 'baby', 'avatar'], data);

        return {
          avatarSource: avatar ? { uri: avatar.url } : null,
        };
      },
    },
  ),
)(ProfileIcon);
