import FacebookLogo from 'web/assets/images/facebook-logo.png';

export const MIN_Y_OFFSET = 1500;

export const BABY_GENDERS = [
  {
    id: 1,
    label: 'GIRL',
    value: 'FEMALE',
  },
  {
    id: 2,
    label: 'BOY',
    value: 'MALE',
  },
];

export const USER_INFO_FIELDS = [
  {
    type: 'firstName',
    placeholder: 'First name',
  },
  {
    type: 'lastName',
    placeholder: 'Last name',
  },
  {
    type: 'email',
    placeholder: 'Email',
  },
];

export const USER_PWD_FIELDS = [
  {
    name: 'currentPassword',
    type: 'password',
    placeholder: 'Current password',
  },
  {
    name: 'newPassword',
    type: 'password',
    placeholder: 'New password',
  },
  {
    name: 'repeatPassword',
    type: 'password',
    placeholder: 'Repeat new password',
  },
];

export const USER_LINKED_ACCOUNTS = [
  {
    network: 'facebook',
    icon: FacebookLogo,
    name: 'Savannah Riley Cooper',
  },
];
