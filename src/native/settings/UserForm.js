// @flow
import type { User } from '../../common/types';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { gql } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import { Avatar, Box, SubmitButton } from '../components';
import hoistStatics from '../components/hoistStatics';
import Icon from 'react-native-vector-icons/Ionicons';
import theme, {
  FONT_COLOR,
  NUBABI_RED,
} from '../../common/themes/defaultTheme';
import imagePicker from '../components/imagePicker';
import {
  formattedDate,
  maxLength,
  renderDatePicker,
  required,
} from '../shared/forms';

type Props = {
  // redux-form uses initialValues prop
  initialValues: User, // eslint-disable-line react/no-unused-prop-types
  onSubmit: () => void,
  handleSubmit: () => void,
  change: () => void,
};

class UserForm extends Component {
  props: Props;

  static fragments = {
    form: gql`
      fragment UserForm on User {
        id
        firstName
        lastName
        dob
        avatar {
          url
        }
      }
    `,
    avatar: gql`
      fragment UserAvatar on User {
        avatar {
          url
        }
      }
    `,
  };

  scroll = null;

  updateImageField = name => ({ data }) => {
    this.props.change(name, { url: `data:image/jpeg;base64,${data}` });
  };

  handleAvatar = () => {
    imagePicker({ title: 'Select Avatar' }).then(
      this.updateImageField('avatar'),
    );
  };

  renderTextInput(field) {
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
          {label ? (
            <Text style={[...labelStyle, { flex: 1 }]}>{label}</Text>
          ) : null}
          {hasExplicitError ? (
            <Text style={labelStyle}>{error.toUpperCase()}</Text>
          ) : null}
        </View>
        <TextInput {...field.input} style={styles.textInput} />
      </View>
    );
  }

  renderAvatar(field) {
    return (
      <Box margin={2} alignItems="center" justifyContent="center">
        <Avatar size={200} src={field.input.value.url} />
      </Box>
    );
  }

  render() {
    const { onSubmit: submit, handleSubmit } = this.props;

    const { renderTextInput, renderAvatar } = this;

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Field name="avatar" component={renderAvatar} />

          <View style={styles.changeAvatarContainer}>
            <View style={styles.changeAvatarView}>
              <View style={styles.changeAvatarInnerView}>
                <TouchableOpacity onPress={this.handleAvatar}>
                  <Icon
                    name="ios-camera-outline"
                    style={styles.changeAvatarIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Field
          name="firstName"
          label="FIRST NAME"
          component={renderTextInput}
          validate={[required, maxLength(32)]}
        />

        <Field
          name="lastName"
          label="LAST NAME"
          component={renderTextInput}
          validate={[required, maxLength(32)]}
        />

        <Field
          name="dob"
          label="DATE OF BIRTH"
          component={renderDatePicker}
          validate={[formattedDate('YYYY-MM-DD')]}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'stretch',
    height: 210,
    paddingBottom: 15,
    marginBottom: 20,
  },
  changeAvatarContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 145,
    marginTop: -55,
  },
  changeAvatarView: {
    height: 24,
    width: 24,
    borderRadius: 24 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeAvatarInnerView: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: NUBABI_RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeAvatarIcon: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  changeCoverPhotoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  changeCoverPhotoIcon: {
    marginTop: 0,
    marginRight: 5,
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'transparent',
  },
  changeCoverPhotoText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 10,
    marginRight: 20,
  },
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
  submitButtonContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: NUBABI_RED,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 15,
  },
  submitText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

// redux-form hoist statics isn't working, so we use our own hoistStatics
// see: https://github.com/erikras/redux-form/issues/2626
export default hoistStatics(
  reduxForm({
    form: 'user',
    enableReinitialize: true,
  }),
)(UserForm);
