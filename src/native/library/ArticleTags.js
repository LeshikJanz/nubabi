// @flow
import type { Tag } from '../../common/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Pill } from '../components';
import theme from '../../common/themes/defaultTheme';
import withLayout from '../components/withLayout';

type Props = {
  tags: Array<Tag>,
};

export const ArticleTags = ({ tags, layout }: Props) => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      style={() => ({
        backgroundColor: theme.colors.open.white1,
        borderBottomWidth: 1,
        borderColor: '#E9ECF4',
        width: layout.viewportWidth,
        padding: 10,
        marginTop: -8,
      })}
    >
      {tags.map(tag =>
        <Pill
          backgroundColor="#fff"
          borderColor="#E9ECF4"
          color={theme.colors.secondary}
          key={tag.id}
        >
          {tag.name}
        </Pill>,
      )}
    </Box>
  );
};

export default withLayout(ArticleTags);
