// @flow
import React, { Component } from 'react';
import {
  View,
  Picker as PickerComponent,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { range } from 'ramda';
import theme from '../../../common/themes/defaultTheme';

class Picker extends Component {
  props: {
    field: Object,
    onPickerOpen: (event: any) => void,
  };

  state = {
    displayed: false,
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  toggle = (event: any) => {
    this.setState({ displayed: !this.state.displayed }, () => {
      this.props.onPickerOpen(event);
    });
  };

  renderPicker() {
    const { field } = this.props;

    const weekOptions = range(32, 43).map(val => {
      return (
        <PickerComponent.Item
          label={val.toString()}
          value={val}
          key={val.toString()}
        />
      );
    });

    return (
      <PickerComponent
        mode="dropdown"
        selectedValue={field.input.value}
        onValueChange={field.input.onChange}
        style={styles.pickerInput}
      >
        {weekOptions}
      </PickerComponent>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.toggle} style={styles.inputContainer}>
          <Text>{this.props.field.input.value}</Text>
        </TouchableOpacity>
        {this.state.displayed ? this.renderPicker() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 30,
    // marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: '#eff1f7',
  },
  pickerInput: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: theme.colors.open.gray0,
    margin: 0,
    padding: 0,
  },
});

export default Picker;
