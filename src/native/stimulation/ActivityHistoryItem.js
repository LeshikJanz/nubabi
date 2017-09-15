// @flow
import React from 'react';
import { memoize } from 'ramda';
import { gql } from 'react-apollo';
import { Box, Card, Icon, Text } from '../components';
import moment from 'moment';
import theme from '../../common/themes/defaultTheme';

type Props = {
  label: ?string,
  onPress: () => void,
  startDate: Date,
  endDate: Date,
};

const getCalendarText = memoize((date: Date) => {
  const parsed = moment(date);
  const month = parsed.format('MMM');
  const day = parsed.format('D');

  return `${month}\n${day}`.toUpperCase();
});

export const getLabel = memoize((startDate: Date, endDate: Date) => {
  const start = moment(startDate).format('D MMMM');
  const end = moment(endDate).format('D MMMM YYYY');

  return `${start} - ${end}`;
});

export const ActivityHistoryItem = ({
  label,
  startDate,
  endDate,
  onPress,
}: Props) => {
  return (
    <Card
      padding={0}
      onPress={onPress}
      margin={theme.contentSpacing.padding}
      marginBottom={0}
    >
      <Box flexDirection="row" alignItems="center">
        <Icon
          name="ios-calendar"
          size={45}
          color={theme.colors.open.gray2}
          style={{ marginLeft: 16 }}
        />
        <Text
          style={() => ({
            backgroundColor: 'transparent',
            fontSize: 9,
            fontWeight: 'bold',
            lineHeight: 10,
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
            left: -27,
            top: 4,
          })}
        >
          {getCalendarText(startDate)}
        </Text>
        <Box flex={1} contentSpacing>
          <Text size={4}>{label || getLabel(startDate, endDate)}</Text>
        </Box>
        <Box alignItems="center" justifyContent="center" padding={1}>
          <Icon name="ios-arrow-forward" size={20} color="#C5CDD7" />
        </Box>
      </Box>
    </Card>
  );
};

ActivityHistoryItem.fragments = {
  item: gql`
    fragment ActivityHistoryItem on ActivityHistory {
      id
      startDate
      endDate
    }
  `,
};

export default ActivityHistoryItem;
