// @flow
import type { Baby } from '../../../common/types';
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
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { DatePicker, SubmitButton } from '../../components';
import hoistStatics from '../../components/hoistStatics';
import Icon from 'react-native-vector-icons/Ionicons';
import NubabiIcon from '../../../common/icons/nubabi';
import theme, {
  FONT_COLOR,
  NUBABI_RED,
} from '../../../common/themes/defaultTheme';
import imagePicker from '../../components/imagePicker';
import Picker from './Picker';
import RelationshipDropdown from './RelationshipDropdown';
import CoverImage from '../Header/CoverImage';
import IconHeader from '../Header/IconHeader';
import GenderSelection from './GenderSelection';
import {
  constantValues,
  formattedDate,
  maxLength,
  required,
} from '../../shared/forms';
import { unitDisplaySelector } from '../../../common/settings/reducer';
import { formatMeasurement } from '../../../common/helpers/measurement';

type Props = {
  // redux-form uses initialValues prop
  initialValues: Baby, // eslint-disable-line react/no-unused-prop-types
  onSubmit: () => void,
  handleSubmit: () => void,
  change: (field: string, value: mixed) => void,
  loading: Boolean,
  mode: 'add' | 'edit',
  unitDisplay: {
    weight: 'kg' | 'lbs',
    height: 'cm' | 'in',
  },
};

/* Validation
 TODO: extract
 */

class Form extends Component {
  props: Props;

  static fragments = {
    form: gql`
      fragment BabyForm on Baby {
        id
        name
        gender
        dob
        weekBorn
        relationship
        weight
        height
        avatar {
          url
        }
        coverImage {
          url
        }
      }
    `,
  };

  scroll = null;

  updateImageField = name => ({ data }) => {
    this.props.change(name, { url: `data:image/jpeg;base64,${data}` });
  };

  handleCoverImage = () => {
    imagePicker({ title: 'Select Cover Photo' }).then(
      this.updateImageField('coverImage'),
    );
  };

  handleAvatar = () => {
    imagePicker({ title: 'Select Avatar' }).then(
      this.updateImageField('avatar'),
    );
  };

  scrollToPicker = () => {
    if (this.scroll) {
      this.scroll.scrollToPosition(0, 180, true);
    }
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
        <TextInput
          {...field.input}
          placeholder={field.placeholder}
          style={styles.textInput}
        />
      </View>
    );
  }

  renderAvatar(field) {
    return <IconHeader avatar={field.input.value} />;
  }

  renderCoverImage(field) {
    return <CoverImage coverImage={field.input.value} />;
  }

  renderGenderSelection(field) {
    return (
      <GenderSelection
        selectedGender={field.input.value}
        onChangeGender={field.input.onChange}
        hasError={field.meta.touched && !!field.meta.error}
      />
    );
  }

  renderPicker = field => {
    return <Picker field={field} onPickerOpen={this.scrollToPicker} />;
  };

  renderRelationshipDropdown = field => {
    return <RelationshipDropdown field={field} />;
  };

  renderDatePicker = field => {
    const { label } = field;
    return (
      <View style={styles.inputContainer}>
        <Text style={[styles.inputLabel, { flex: 1 }]}>
          {label}
        </Text>

        <DatePicker
          onChange={field.input.onChange}
          date={field.input.value}
          format="YYYY-MM-DD"
        />
      </View>
    );
  };

  renderMeasurementInput = field => {
    // TODO: remove duplication with renderTextInput, extract
    // we can access errors on field.meta.errors and dirty state and field.meta.touched
    const { unitDisplay } = this.props;
    const { label, input: { name, value } } = field;
    const { touched, error } = field.meta;

    const hasError = touched && error;
    // We don't want to show required as an error since the coloring
    // should suffice
    const hasExplicitError = hasError && error !== 'Required';

    const containerStyle = [
      styles.inputContainer,
      hasError ? styles.inputContainerError : {},
      name === 'weight' ? { marginTop: 15 } : {},
    ];

    const labelStyle = [styles.inputLabel, hasError ? styles.hasError : {}];
    const updaters = {
      height: 'onUpdateHeight',
      weight: 'onUpdateWeight',
    };

    const update = this.props[updaters[name]];
    const measurementText =
      value &&
      `${formatMeasurement(unitDisplay[name], value)} ${unitDisplay[name]}`;

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
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textInput}>
            {measurementText}
          </Text>
          <TouchableOpacity onPress={update}>
            <Text style={{ color: theme.colors.secondary }}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderMeasurementsSection() {
    const { mode, unitDisplay } = this.props;
    const { renderTextInput, renderMeasurementInput } = this;

    if (mode === 'add') {
      return (
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Field
              name="weight"
              placeholder={`Weight (${unitDisplay.weight})`}
              component={renderTextInput}
              validate={[required]}
            />
            <Field
              name="height"
              placeholder={`Height (${unitDisplay.height})`}
              component={renderTextInput}
              validate={[required]}
            />
          </View>
          <View
            style={{
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  color: theme.colors.secondary,
                  textAlign: 'center',
                  fontSize: 10,
                }}
              >
                A guess is fine, you can record new measurements at any time
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View>
        <Field
          name="weight"
          label="WEIGHT"
          component={renderMeasurementInput}
        />

        <Field
          name="height"
          label="HEIGHT"
          component={renderMeasurementInput}
        />
      </View>
    );
  }

  render() {
    const { onSubmit: submit, handleSubmit } = this.props;

    const {
      renderGenderSelection,
      renderPicker,
      renderTextInput,
      renderCoverImage,
      renderAvatar,
      renderRelationshipDropdown,
      renderDatePicker,
    } = this;

    let submitText;

    if (this.props.loading) {
      submitText = this.props.mode === 'add' ? 'ADDING...' : 'SAVING...';
    } else {
      submitText = this.props.mode === 'add' ? 'ADD BABY' : 'SAVE BABY';
    }

    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        ref={ref => {
          this.scroll = ref;
        }}
      >
        <View style={styles.headerContainer}>
          <Field name="coverImage" component={renderCoverImage} />
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
          <View style={styles.changeCoverPhotoView}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={this.handleCoverImage}
            >
              <NubabiIcon
                style={styles.changeCoverPhotoIcon}
                name="editProfile"
              />
              <Text style={styles.changeCoverPhotoText}>
                Change Cover Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Field
          name="gender"
          component={renderGenderSelection}
          validate={[required, constantValues('MALE', 'FEMALE')]}
        />

        <Field
          name="name"
          label="NAME"
          component={renderTextInput}
          validate={[required, maxLength(32)]}
        />

        <Field
          name="dob"
          label="BORN ON"
          component={renderDatePicker}
          validate={[required, formattedDate('YYYY-MM-DD')]}
        />

        <Field
          name="relationship"
          label="RELATIONSHIP TO BABY"
          component={renderRelationshipDropdown}
          validate={[required]}
        />

        <View>
          <Text style={[styles.inputLabel, { marginHorizontal: 30 }]}>
            WEEK BABY BORN
          </Text>
          <Field
            name="weekBorn"
            component={renderPicker}
            validate={[required]}
          />
        </View>

        {this.renderMeasurementsSection()}

        <SubmitButton
          onPress={handleSubmit(submit)}
          loading={this.props.loading}
          disabled={this.props.loading}
          submitText={submitText}
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
    marginLeft: 45,
    marginTop: -10,
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
});

// redux-form hoist statics isn't working, so we use our own hoistStatics
// see: https://github.com/erikras/redux-form/issues/2626
export default hoistStatics(
  compose(
    connect(state => ({ unitDisplay: unitDisplaySelector(state) })),
    reduxForm({
      form: 'baby',
      enableReinitialize: true,
    }),
  ),
)(Form);
