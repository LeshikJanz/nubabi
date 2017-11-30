// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatMeasurement } from '../../../common/helpers/measurement';

type Props = {
  height: number,
  weight: number,
  heightUnit: 'cm' | 'in',
  weightUnit: 'kg' | 'lbs',
};

const Measurements = ({ height, weight, heightUnit, weightUnit }: Props) => {
  return (
    <View style={styles.measurements}>
      <View style={styles.weight}>
        <Text style={styles.weightHeader}>WEIGHT</Text>
        <Text style={styles.weightValue}>
          {formatMeasurement(weightUnit, weight)}
          {weightUnit}
        </Text>
      </View>
      <View style={styles.height}>
        <Text style={styles.heightHeader}>HEIGHT</Text>
        <Text style={styles.heightValue}>
          {formatMeasurement(heightUnit, height)}
          {heightUnit}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  measurements: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
  },
  weight: {
    flex: 2,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  weightHeader: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
  },
  weightValue: {
    color: '#fff',
    fontSize: 18,
  },
  height: {
    flex: 2,
    alignItems: 'center',
  },
  heightHeader: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
  },
  heightValue: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Measurements;
