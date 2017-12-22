// @flow
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, } from 'react-native';
import { NubabiIcon } from '../../components';
import { NUBABI_RED } from 'core/themes/defaultTheme';
import { formatAge } from 'core/helpers/formatAge';

type Props = {
  babyName: string,
  birthDate: string,
  onEditBaby: () => void,
};

export const NameAgeRow = ({ babyName, birthDate, onEditBaby }: Props) => (
  <View style={styles.profileBackground}>
    <View style={styles.profileHeaderButtonView}>
      <View style={styles.profileHeaderButton}>
        <TouchableHighlight style={styles.profileHeaderTouch}>
          <Text style={styles.profileHeaderButtonText}>?</Text>
        </TouchableHighlight>
      </View>
    </View>
    <View style={styles.profileNameView}>
      <View style={styles.backdropView}>
        <Text style={styles.babyName}>{babyName}</Text>
      </View>
      <View
        style={[styles.backdropView, { marginLeft: 25, marginRight: 25 }]}
      >
        <View style={styles.babyAgeBackground}>
          <Text style={styles.babyAge}>
            {formatAge(birthDate)}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.profileHeaderButtonView}>
      <TouchableOpacity
        onPress={onEditBaby}
        style={styles.profileHeaderButton}
      >
        <NubabiIcon
          style={[
            styles.profileHeaderButtonText,
            { marginLeft: 7, fontSize: 16, marginTop: -1 },
          ]}
          name="editProfile"
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  profileBackground: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  backdropView: {
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
  },
  profileHeaderButtonView: {
    flex: 2,
    alignItems: 'center',
  },
  profileHeaderTouch: {
    alignItems: 'center',
    flex: 1,
  },
  profileHeaderButton: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 34 / 2,
    height: 34,
    width: 34,
  },
  profileHeaderButtonText: {
    marginTop: 4,
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  profileNameView: {
    flexDirection: 'column',
    flex: 3,
    alignItems: 'center',
  },
  babyName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
  },
  babyAge: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  babyAgeBackground: {
    borderColor: NUBABI_RED,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: NUBABI_RED,
    marginTop: 5,
    padding: 4,
    paddingHorizontal: 10,
  },
});

export default NameAgeRow;
