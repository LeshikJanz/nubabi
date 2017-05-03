// @flow
import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { gql } from 'react-apollo';
import NubabiIcon from '../../common/icons/nubabi';
import theme, {
  LIGHT_GREY,
  FONT_COLOR,
  NUBABI_RED,
} from '../../common/themes/defaultTheme';

type Props = {
  header: string,
  amount: ?number,
  unit: 'kg' | 'cm',
  iconName: string,
  onUpdate: () => void,
};

const Measurement = ({ header, amount, unit, iconName, onUpdate }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>{header}</Text>
        <NubabiIcon
          name={iconName}
          size={17}
          color={LIGHT_GREY}
          style={{ marginTop: 10, marginRight: 10 }}
        />
      </View>
      <View style={styles.valueRow}>
        {amount
          ? <Text style={styles.valueText}>{amount}{unit}</Text>
          : <Text style={styles.noDataText}>No Data Yet</Text>}
      </View>
      <View style={styles.updateRow}>
        <TouchableHighlight>
          <Text style={styles.updateText} onPress={onUpdate}>Update</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

Measurement.fragments = {
  weight: gql`
    fragment Measurement on Baby {
      weight
      height
    }
  `,
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderRadius: 4,
    height: 97,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    color: FONT_COLOR,
    fontSize: 18,
    marginLeft: 10,
    marginTop: 7,
  },
  valueRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  valueText: {
    color: FONT_COLOR,
    fontSize: 28,
  },
  noDataText: {
    marginVertical: 10,
    fontSize: 10,
    color: theme.colors.gray,
  },
  updateRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  updateText: {
    fontSize: 10,
    color: NUBABI_RED,
    fontWeight: '700',
  },
});

export default Measurement;
