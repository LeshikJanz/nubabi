// @flow
import type { Expert } from '../../common/types';
import React, { PureComponent } from 'react';
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-menu';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Box, Text } from '../components';
import theme from '../../common/themes/defaultTheme';

export type GrowthPeriodOption = {
  label: string,
  key: string,
  introduction: string,
  content: string,
  expert: Expert,
};

type Props = {
  onPeriodSelect: (periodId: string) => void,
  selectedPeriod: GrowthPeriodOption,
  options: Array<GrowthPeriodOption>,
};

class PeriodFilter extends PureComponent {
  props: Props;

  renderOptions() {
    return this.props.options.map(option => (
      <MenuOption key={option.key} value={option.key}>
        <Text>{option.label}</Text>
      </MenuOption>
    ));
  }

  render() {
    return (
      <MenuContext style={{ flex: 1 }}>
        <Menu onSelect={this.props.onPeriodSelect} style={styles.dropdown}>
          <MenuTrigger>
            <Box
              backgroundColor="white"
              alignItems="center"
              padding={0.8}
              margin={1}
              borderRadius={4}
              borderWidth={1}
              style={() => ({ borderColor: '#E9ECF4' })}
              flexDirection="row"
            >
              <Text
                key={this.props.selectedPeriod.key}
                color="black"
                size={2}
                flex={1}
              >
                {this.props.selectedPeriod.label}
              </Text>
              <Icon
                name="md-arrow-dropdown"
                size={20}
                color={theme.colors.secondary}
              />
            </Box>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.dropdownOptions}>
            {this.renderOptions()}
          </MenuOptions>
        </Menu>
      </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  dropdownOptions: {
    left: 17,
    flex: 1,
    marginTop: 63,
    width: 341,
    zIndex: 2,
    alignSelf: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default PeriodFilter;
