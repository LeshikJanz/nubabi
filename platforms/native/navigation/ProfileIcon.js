// @flow
import React from 'react';
import { DeviceInfo, View, StyleSheet } from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import type { ImageSource } from 'react-native';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import color from 'color';
import { dontUpdateForUploadedImage, withCurrentBaby } from '../components';

const babyIcon = require('core/images/face_icon.jpg');

type Props = {
  avatarSource?: ImageSource,
  active: boolean,
  tintColor: string,
};

const ProfileIcon = ({ avatarSource, active, tintColor }: Props) => {
  const avatar = avatarSource && avatarSource.url ? avatarSource : babyIcon;

  const activeStyle = active
    ? {
        borderColor: color(tintColor)
          .alpha(0.6)
          .string(),
        borderWidth: 2,
      }
    : {};

  return (
    <View style={styles.tabIconOuterView}>
      <View style={[styles.tabIconInnerView]}>
        <View style={[styles.tabIconInnerImageHolder, activeStyle]}>
          <Image
            source={avatar}
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
    borderBottomWidth: 0,
    borderColor: '#e6e9f0',
    height: 80,
    borderRadius: 80 / 2,
    padding: 13,
    margin: 0,
    top: -20,
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
    marginTop: -6,
    paddingTop: DeviceInfo.isIPhoneX_deprecated ? 5 : 0,
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
  withCurrentBaby,
  graphql(
    gql`
      query getBabyAvatar($id: ID) {
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
        fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
        variables: { id: currentBabyId },
        skip: !currentBabyId,
      }),
      props: ({ data }) => {
        const avatar = path(['viewer', 'baby', 'avatar', 'url'], data);

        return {
          avatarSource: { url: avatar },
        };
      },
    },
  ),
  dontUpdateForUploadedImage('avatarSource'),
)(ProfileIcon);
