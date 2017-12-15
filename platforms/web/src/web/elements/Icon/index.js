// @flow
import * as React from 'react';
import BabyStollerRegular from 'web/assets/images/icons/baby-stroller-regular.svg';
import BabyStollerActive from 'web/assets/images/icons/baby-stroller-active.svg';
import GearActive from 'web/assets/images/icons/gear-active.svg';
import GearRegular from 'web/assets/images/icons/gear-regular.svg';
import NotificationsActive from 'web/assets/images/icons/notifications-active.svg';
import NotificationsRegular from 'web/assets/images/icons/notifications-regular.svg';
import PersonActive from 'web/assets/images/icons/person-active.svg';
import PersonRegular from 'web/assets/images/icons/person-regular.svg';

type Props = {
  name: string,
  isactive: number,
};

const icons = {
  stoller: {
    regular: <BabyStollerRegular />,
    active: <BabyStollerActive />,
  },
  gear: {
    regular: <GearRegular />,
    active: <GearActive />,
  },
  notifications: {
    active: <NotificationsActive />,
    regular: <NotificationsRegular />,
  },
  person: {
    active: <PersonActive />,
    regular: <PersonRegular />,
  },
};

const Icon = ({ name, isactive }: Props) =>
  isactive ? icons[name].active : icons[name].regular;

export default Icon;
