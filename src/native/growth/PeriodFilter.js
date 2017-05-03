import React, { Component } from 'react';
import ModalPicker from 'react-native-modal-picker';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Box, Text } from '../components';
import theme from '../../common/themes/defaultTheme';

export type GrowthPeriodOption = {
  label: string,
  key: string,
};

type Props = {
  onPeriodSelect: () => void,
  currentPeriod: GrowthPeriodOption,
  options: Array<GrowthPeriodOption>,
};

class PeriodFilter extends Component {
  props: Props;

  handleSelect = option => {
    this.setState({
      selectedPeriod: option,
    });
  };

  render() {
    console.log(this.props);
    return (
      <Box
        flex={1}
        style={theme => ({ backgroundColor: theme.colors.open.white1 })}
      >
        <ModalPicker
          data={this.props.options}
          initValue={this.props.currentPeriod.label}
          cancelText="Cancel"
          overlayStyle={{ backgroundColor: 'rgba(0,0,0,.9)' }}
        >
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
              key={this.props.currentPeriod.key}
              color="black"
              size={2}
              flex={1}
            >
              {this.props.currentPeriod.label}
            </Text>
            <Icon
              name="md-arrow-dropdown"
              size={20}
              color={theme.colors.secondary}
            />
          </Box>
        </ModalPicker>
      </Box>
    );
  }
}

export default PeriodFilter;
