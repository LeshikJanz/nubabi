// @flow
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose, pick } from 'ramda';
import { ListSeparator, withPullToRefresh } from '../components';
import ActivityHistoryItem, { getLabel } from './ActivityHistoryItem';

type Props = {
  history: Array<ActivityHistoryItem>, // TODO
  onNavigateToPeriod: (id: string, title: string) => void,
  refreshing: boolean,
  handleRefresh: () => void,
};

type ActivityHistoryItemType = {
  id: number, // TODO,
  startDate: Date,
  endDate: Date,
};

const keyExtractor = (item: ActivityHistoryItemType) => item.id;

export class ActivityHistoryList extends PureComponent {
  props: Props;

  renderItem = ({ item }: { item: ActivityHistoryItemType }) => {
    const itemProps = pick(['startDate', 'endDate'], item);
    const onPress = () => {
      this.props.onNavigateToPeriod(
        item.id,
        getLabel(item.startDate, item.endDate),
      );
    };

    return <ActivityHistoryItem {...itemProps} onPress={onPress} />;
  };

  render() {
    const { history, refreshing, handleRefresh } = this.props;

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
