// @flow
import React from 'react';
import { Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FAB } from '../components';
import theme from '../../common/themes/defaultTheme';

type Props = {
  url: string,
  title: string,
  message: string,
};

const handleShare = (url: string, title: string, message: string) => {
  Share.share(
    {
      message,
      url,
      title,
    },
    {
      tintColor: theme.colors.primary,
    },
  );
};

export const ShareButton = ({ url, title, message }: Props) => {
  const onPress = () => handleShare(url, title, message);
  return (
    <FAB
      onPress={onPress}
      size={44}
      style={{
        position: 'absolute',
        bottom: 70,
        left: 15,
      }}
    >
      <Icon size={24} name="ios-share-alt" color={theme.colors.gray} />
    </FAB>
  );
};

export default ShareButton;
