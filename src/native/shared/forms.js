// @flow
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import FloatingLabelTextInput from 'react-native-floating-label-text-input';
import moment from 'moment';
import theme, { FONT_COLOR } from '../../common/themes/defaultTheme';
import { DatePicker } from '../components';
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

export const isEditable = field => {
  return typeof field.editable !== 'undefined' ? field.editable : true;
};

export const renderTextInput = field => {
  // we can access errors on field.meta.errors and dirty state and field.meta.touched
  const { label, placeholder } = field;
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
  let typeProps = {
    keyboardType: 'default',
  };

  if (field.type === 'email') {
    typeProps = {
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      autoCorrect: false,
    };
  }

  const borderProps = {};
  if (field.underlineColorAndroid) {
    borderProps.underlineColorAndroid = field.underlineColorAndroid;
  }

  const multiline = field.multiline || false;
  const editable =
    typeof field.editable !== 'undefined' ? field.editable : true;

  const TextInputComponent = field.floating
    ? FloatingLabelTextInput
    : TextInput;

  const floatingProps = field.floating
    ? {
        noBorder: true,
        floatingLabelStyle: { top: -8, paddingTop: 0 },
        textFieldHolderStyle: { marginTop: 0 },
      }
    : {};

  return (
    <View style={containerStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {label ? (
          <Text style={[...labelStyle, { flex: 1 }]}>{label}</Text>
        ) : null}
        {hasExplicitError ? (
          <Text style={labelStyle}>{error.toUpperCase()}</Text>
        ) : null}
      </View>
      <TextInputComponent
        {...typeProps}
        {...borderProps}
        {...floatingProps}
        {...field.input}
        placeholder={placeholder}
        multiline={multiline}
        style={styles.textInput}
        editable={editable}
      />
    </View>
  );
};

export const renderRelationshipDropdown = field => {
  return <RelationshipDropdown field={field} />;
};

export const renderDatePicker = field => {
  const { label, dateFormat: format = 'YYYY-MM-DD', mode = 'date' } = field;

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.inputLabel, { flex: 1 }]}>{label}</Text>

      <DatePicker
        onChange={field.input.onChange}
        date={field.input.value}
        format={format}
        mode={mode}
      />
    </View>
  );
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
