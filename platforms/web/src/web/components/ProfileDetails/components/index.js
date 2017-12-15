// @flow
import React, { PureComponent } from 'react';
import Avatar from './Avatar';
import { UserInfoEditor } from 'web/components';
import PwdChanger from './PwdChanger';
import LinkedAccounts from './LinkedAccounts';
import {
  USER_PWD_FIELDS,
  USER_INFO_FIELDS,
  USER_LINKED_ACCOUNTS,
} from 'web/constants';
import {
  SaveButton,
  ButtonBox,
  Title,
  ProfileDetailsContainer,
} from '../styled';
import { path } from 'ramda';

type Props = {
  user: Object,
  saveUser: Function,
};
type State = {
  isPwdSectionVisible: number,
};

export default class ProfileDetails extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isPwdSectionVisible: 0 };
  }

  pwdSectionVisibilityOnChange = (isvisible: number) => {
    this.setState({ isPwdSectionVisible: isvisible });
  };

  render() {
    const { user, saveUser } = this.props;
    return (
      <ProfileDetailsContainer>
        <Title>My Profile Details</Title>
        <Avatar image={path(['avatar', 'thumb', 'url'], user)} />
        <UserInfoEditor user={user} infoFields={USER_INFO_FIELDS} />
        <PwdChanger
          visibleOnChange={this.pwdSectionVisibilityOnChange}
          isSectionVisible={this.state.isPwdSectionVisible}
          pwdFields={USER_PWD_FIELDS}
        />
        <LinkedAccounts linkedAccounts={USER_LINKED_ACCOUNTS} />
        <ButtonBox>
          <SaveButton onClick={saveUser}>SAVE</SaveButton>
        </ButtonBox>
      </ProfileDetailsContainer>
    );
  }
}
