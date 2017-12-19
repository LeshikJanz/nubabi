import React from 'react';
import FacebookLogo from 'web/assets/images/facebook-logo.png';
import { CreditCard, Eft, IPay, Snapscan } from 'web/components';

const renderCreditCard = props => <CreditCard {...props} />;
const renderEft = props => <Eft {...props} />;
const renderIPay = props => <IPay {...props} />;
const renderSnapscan = props => <Snapscan {...props} />;

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
    name: 'firstName',
    placeholder: 'First name',
  },
  {
    type: 'lastName',
    name: 'lastName',
    placeholder: 'Last name',
  },
  {
    type: 'email',
    name: 'email',
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

export const SUBSCRIBE_ROUTES = [
  {
    route: 'creditcard',
    label: 'Credit/Debit Card',
    component: props => renderCreditCard(props),
    id: 'creditcard',
  },
  {
    route: 'eft',
    label: 'EFT',
    component: props => renderEft(props),
    id: 'eft',
  },
  {
    route: 'ipay',
    label: 'i-Pay',
    component: props => renderIPay(props),
    id: 'ipay',
  },
  {
    route: 'snapscan',
    label: 'Snapscan',
    component: props => renderSnapscan(props),
    id: 'snapscan',
  },
];

export const CURRENT_PLAN = {
  title: 'Annual package',
  price: 37.5,
  billedAmount: 400,
  monthsFree: 3,
  paymentTotal: 400.0,
};
