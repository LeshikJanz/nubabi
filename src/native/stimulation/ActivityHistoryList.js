// @flow
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose, pick } from 'ramda';
import { ListSeparator, withPullToRefresh } from '../components';
import ActivityHistoryItem from './ActivityHistoryItem';

type Props = {
  history: Array<ActivityHistoryItem>, // TODO
  refreshing: boolean,
  handleRefresh: () => void,
};

type ActivityHistoryItemType = {
  id: number, // TODO,
  startDate: Date,
  endDate: Date,
};

const keyExtractor = (item: ActivityHistoryItemType) => item.id;
const mockedHistory: Array<ActivityHistoryItemType> = [
  {
    id: 1,
    label: 'Last Week',
    startDate: new Date('2017-08-27'),
    endDate: new Date('2017-09-02'),
  },
  {
    id: 2,
    startDate: new Date('2017-08-20'),
    endDate: new Date('2017-08-26'),
  },
  {
    id: 3,
    startDate: new Date('2017-08-13'),
    endDate: new Date('2017-08-19'),
  },
  {
    id: 4,
    startDate: new Date('2017-08-06'),
    endDate: new Date('2017-08-12'),
  },
  {
    id: 5,
    startDate: new Date('2017-07-30'),
    endDate: new Date('2017-08-05'),
  },
];

export class ActivityHistoryList extends PureComponent {
  props: Props;

  renderItem = ({ item }: { item: ActivityHistoryItemType }) => {
    const itemProps = pick(['startDate', 'endDate', 'label'], item);
    return <ActivityHistoryItem {...itemProps} onPress={() => {}} />;
  };

  render() {
    const { history = mockedHistory, refreshing, handleRefresh } = this.props;

    return (
      <FlatList
        data={history}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={ListSeparator}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }
}

export default compose(withPullToRefresh)(ActivityHistoryList);
