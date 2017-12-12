// @flow
import React, { PureComponent } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Button } from 'web/elements';
import Avatar from './Avatar';
import InfoChanger from './InfoChanger';
import PwdChanger from './PwdChanger';
import LinkedAccounts from './LinkedAccounts';
import FacebookLogo from 'web/assets/images/facebook-logo.png';

type Props = {};
type State = {
  isPwdSectionVisible: boolean,
  linkedAccounts: Array<{
    network: string,
    icon?: any,
    name: string,
  }>,
  infoFields: Array<{
    type: string,
    placeholder: string,
    value: string,
  }>,
};

const ProfileDetailsContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 30px;
`;

const Title = styled.h3`
  font-weight: 300;
  font-size: 18px;
  margin: 0;
`;

const ButtonBox = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const SaveButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-weight: 300;
  border: none;
`;

class ProfileDetails extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      linkedAccounts: [
        {
          network: 'facebook',
          icon: FacebookLogo,
          name: 'Savannah Riley Cooper',
        },
      ],
      isPwdSectionVisible: false,
      infoFields: [
        {
          type: 'firstName',
          placeholder: 'First name',
          value: 'Savannah',
        },
        {
          type: 'lastName',
          placeholder: 'Last name',
          value: 'Cooper',
        },
        {
          type: 'email',
          placeholder: 'Email',
          value: 'savannahcooper@gmail.com',
        },
      ],
      pwdFields: [
        {
          name: 'currentPassword',
          type: 'password',
          value: 'password',
          placeholder: 'Current password',
        },
        {
          name: 'newPassword',
          value: 'password',
          type: 'password',
          placeholder: 'New password',
        },
        {
          name: 'repeatPassword',
          value: 'password',
          type: 'password',
          placeholder: 'Repeat new password',
        },
      ],
    };
  }

  pwdSectionVisibilityOnChange = (isVisible: boolean) => {
    this.setState({ isPwdSectionVisible: isVisible });
  };

  render() {
    return (
      <ProfileDetailsContainer>
        <Title>My Profile Details</Title>
        <Avatar />
        <InfoChanger infoFields={this.state.infoFields} />
        <PwdChanger
          visibleOnChange={this.pwdSectionVisibilityOnChange}
          isSectionVisible={this.state.isPwdSectionVisible}
          pwdFields={this.state.pwdFields}
        />
        <LinkedAccounts linkedAccounts={this.state.linkedAccounts} />
        <ButtonBox>
          <SaveButton>SAVE</SaveButton>
        </ButtonBox>
      </ProfileDetailsContainer>
    );
  }
}

export default ProfileDetails;
