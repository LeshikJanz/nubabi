// @flow
import React, { PureComponent } from 'react';
import { LayoutAnimation } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { forEachObjIndexed, keys } from 'ramda';
import ContactsWrapper from 'react-native-contacts-wrapper';
import hoistStatics from '../components/hoistStatics';
import {
  renderTextInput,
  renderRelationshipDropdown,
  required,
  maxLength,
} from '../shared/forms';
import { Box, Text, SubmitButton, FAB } from '../components';

type Props = {
  handleSubmit: () => void,
  change: (field: string, value: any) => void,
  touch: (...keys: Array<string>) => void,
};

type Contact = {
  name: string,
  phone: string,
  email: string,
};

export class InviteUserForm extends PureComponent {
  props: Props;
  state = {
    loading: false,
  };

  handleSubmit = () => {
    this.setState({ loading: true }, () => {
      setTimeout(() => this.setState({ loading: false }), 1000);
    });
  };

  handleContacts = () => {
    ContactsWrapper.getContact()
      .then((contact: Contact) => {
        const [firstName, lastName] = contact.name.split(' ');
        const { email } = contact;
        const values = {
          firstName,
          lastName,
          email,
        };

        forEachObjIndexed((value, key) => {
          this.props.change(key, value);
        }, values);
      })
      .catch(() => {});
  };

  render() {
    const { handleSubmit } = this.props;
    const submit = this.handleSubmit;

    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        keyboardShouldPersistTaps="handled"
      >
        <Box
          padding={2}
          backgroundColor="panel"
          alignItems="center"
          justifyContent="center"
          borderColor="separator"
          borderBottomWidth={1}
        >
          <Text medium size={2} align="center">
            Enter the details of the person
          </Text>
          <Text medium size={2} align="center">
            you would like to add
          </Text>
          <Text align="center" marginTop={1}>
            Or choose one of your contacts
          </Text>

          <FAB
            size={50}
            onPress={this.handleContacts}
            style={{ position: 'absolute', top: 103 }}
          >
            <Icon name="ios-contacts" size={30} />
          </FAB>
        </Box>
        <Box paddingTop={2} style={() => ({ zIndex: -1 })}>
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
            name="email"
            label="EMAIL"
            component={renderTextInput}
            validate={[required, maxLength(32)]}
          />

          <Field
            name="relationship"
            label="RELATIONSHIP"
            component={renderRelationshipDropdown}
            validate={[required]}
          />
        </Box>

        <SubmitButton
          onPress={handleSubmit(submit)}
          loading={this.state.loading}
          submitText="INVITE"
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default hoistStatics(
  reduxForm({
    form: 'inviteUser',
  }),
)(InviteUserForm);
