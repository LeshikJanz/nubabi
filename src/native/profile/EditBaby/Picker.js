// @flow
import React, { Component } from 'react';
import {
  LayoutAnimation,
  Picker as PickerComponent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { range } from 'ramda';
import theme from '../../../common/themes/defaultTheme';
import { isEditable } from '../../shared/forms';

export const weekOptions = range(20, 44).map(val => {
  return (
    <PickerComponent.Item
      label={val.toString()}
      value={val}
      key={val.toString()}
    />
  );
});

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
    const { field } = this.props;
    const hasError = field.meta.touched && !!field.meta.error;
    const editable = isEditable(field);

    const Container = editable ? TouchableOpacity : View;

    const containerProps = editable ? { onPress: this.toggle } : {};

    const borderStyle = hasError ? { borderColor: theme.colors.danger } : {};

    return (
      <View style={{ flex: 1 }}>
        <Container
          {...containerProps}
          style={[styles.inputContainer, borderStyle]}
        >
          <Text>{this.props.field.input.value}</Text>
        </Container>
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
