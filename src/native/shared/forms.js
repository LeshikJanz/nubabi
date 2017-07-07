// @flow
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import moment from 'moment';
import theme, { FONT_COLOR } from '../../common/themes/defaultTheme';
import RelationshipDropdown from '../profile/EditBaby/RelationshipDropdown';

export const required = (value: ?mixed) => {
  return value ? undefined : 'Required';
};

export const maxLength = (max: number) => (value: ?string) => {
  return value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;
};

export const minValue = (min: number) => (value: ?number) => {
  return value && value < min ? `Must be at least ${min}` : undefined;
};

export const maxValue = (max: number) => (value: ?number) => {
  return value && value > max ? `Must be at most ${max}` : undefined;
};

export const formattedDate = (format: string) => (value: ?Date) => {
  if (!value) {
    return;
  }

  if (!moment(value, format).isValid()) {
    // eslint-disable-next-line consistent-return
    return `Must be a date in ${format} format`;
  }
};

export const constantValues = (...constants: Array<string>) => (
  value: ?string,
) => {
  return value && !constants.includes(value)
    ? `Must be one the values ${constants.join(',')}`
    : undefined;
};

export const renderTextInput = field => {
  // we can access errors on field.meta.errors and dirty state and field.meta.touched
  const { label } = field;
  const { touched, error } = field.meta;

  const hasError = touched && error;
  // We don't want to show required as an error since the coloring
  // should suffice
  const hasExplicitError = hasError && error !== 'Required';

  const containerStyle = [
    styles.inputContainer,
    hasError ? styles.inputContainerError : {},
  ];

  const labelStyle = [styles.inputLabel, hasError ? styles.hasError : {}];

  return (
    <View style={containerStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {label
          ? <Text style={[...labelStyle, { flex: 1 }]}>
              {label}
            </Text>
          : null}
        {hasExplicitError
          ? <Text style={labelStyle}>
              {error.toUpperCase()}
            </Text>
          : null}
      </View>
      <TextInput {...field.input} style={styles.textInput} />
    </View>
  );
};

export const renderRelationshipDropdown = field => {
  return <RelationshipDropdown field={field} />;
};

const styles = {
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 40,
    marginHorizontal: 30,
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: '#eff1f7',
  },
  inputContainerError: {
    borderColor: theme.colors.danger,
  },
  hasError: {
    color: theme.colors.danger,
  },
  textInput: {
    flex: 1,
    color: FONT_COLOR,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 8,
    color: '#a8b3c2',
    marginBottom: 4,
  },
};
