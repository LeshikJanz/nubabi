// @flow
import React from 'react';
import InviteUserForm from './InviteUserForm';

type Props = {};

export const InviteUser = () => {
  return <InviteUserForm initialValues={{ relationship: 'Other' }} />;
};

export default InviteUser;
