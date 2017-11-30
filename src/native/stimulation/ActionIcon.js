// @flow
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createComponent } from 'react-fela';

export const Icon = createComponent(
  ({ theme, color }) => ({
    color: theme.colors[color],
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 45 / 2,
    borderColor: theme.colors.open.gray1,
    borderWidth: 1,
    width: 45,
    height: 45,
    paddingVertical: 45 / 5,
  }),
  IonIcon,
  ['name', 'size', 'style'],
);

export default Icon;
