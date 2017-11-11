// @flow
import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, TouchableOpacity } from 'react-native';
import Menu, {
  MenuContext,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import { Box, Text } from '../../components';
import theme from 'core/themes/defaultTheme';
import { isEditable } from '../../shared/forms';

type BabyRelationshipOption = {
  label: string,
  key: string,
};

const options: Array<BabyRelationshipOption> = [
  { key: 'Parent', label: 'Parent' },
  { key: 'Grandparent', label: 'Grandparent' },
  { key: 'Guardian', label: 'Guardian' },
  { key: 'Relative', label: 'Relative' },
  { key: 'Au-pair', label: 'Au-pair' },
  { key: 'Other', label: 'Other' },
];

type Props = {
  field: any,
};

class RelationshipDropdown extends Component {
  props: Props;
  menu = null;

  renderTouchable = () => {
    return this.props.field.editable ? <TouchableOpacity /> : <Box />;
  };

  handleSelect = (val: string) => {
    this.props.field.input.onChange(this.findOption(val).key);
  };

  findOption(val: string) {
    return options.find(option => option.key === val);
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  renderOptions() {
    return options.map(option => (
      <MenuOption
        key={option.key}
        value={option.key}
        renderTouchable={this.renderTouchable}
      >
        <Text>{option.label}</Text>
      </MenuOption>
    ));
  }

  renderLabel() {
    return (
      <Text
        style={() => ({
          fontSize: 8,
          color: '#a8b3c2',
          marginBottom: 4,
        })}
      >
        {this.props.field.label}
      </Text>
    );
  }

  render() {
    // Default to "Other", to ease migration
    const current = this.findOption(this.props.field.input.value) || options[5];
    const { renderTouchable } = this;
    const editable = isEditable(this.props.field);

    return (
      <MenuContext
        style={{ flex: 1 }}
        ref={ref => {
          this.menu = ref;
        }}
      >
        <Menu onSelect={this.handleSelect} style={styles.dropdown}>
          {this.renderLabel()}

          <MenuTrigger
            disabled={!editable}
            style={styles.trigger}
            renderTouchable={renderTouchable}
          >
            <Box
              flex={1}
              flexDirection="row"
              backgroundColor="white"
              alignItems="center"
              margin={0}
              padding={0}
              borderRadius={4}
              borderBottomWidth={1}
              style={() => ({ borderColor: '#E9ECF4' })}
            >
              <Text
                key={current.key}
                color="black"
                size={2}
                flex={1}
                style={() => ({ marginBottom: 4 })}
              >
                {current.label}
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
  dropdown: {
    flex: 1,
    paddingHorizontal: 30,
    marginBottom: 15,
    justifyContent: 'flex-start',
  },
  trigger: {
    padding: 0,
  },
  dropdownOptions: {
    position: 'relative',
    left: 30,
    flex: 1,
    marginTop: -15,
    width: 320,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 15,
  },
});

export default RelationshipDropdown;
