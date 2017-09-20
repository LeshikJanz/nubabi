// @flow
import type { File } from '../../common/types';
import React, { PureComponent } from 'react';
import { ListView } from 'react-native';
import { compose } from 'ramda';
import Box from './Box';
import Card from './Card';
import Text from './Text';
import showNoContentViewIf from './showNoContentViewIf';
import HorizontalCardItem from './HorizontalCardItem';
import {
  isEmptyProp,
  isUUID as isOptimistic,
} from '../../common/helpers/graphqlUtils';

type HorizontalCardItemType = {
  id: string,
  title: string,
  files: Array<File>,
};

type Props = {
  items: Array<HorizontalCardItemType>,
  onItemPress: (id: string, title: string) => void,
  headerTitle?: string,
  headerTitleSize?: number,
  headerRight?: React.Element<*>,
};

type State = {
  ds: ListView.DataSource,
};

export class HorizontalCardList extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      ds: ds.cloneWithRows(props.items),
      shouldScrollToBottom: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.items),
      });
    }
  }

  renderRow = (item: HorizontalCardItemType) => {
    if (!item) {
      return null;
    }

    const onViewItem = () => {
      this.props.onItemPress(item.id, item.title);
    };

    const cardProps = isOptimistic(item.id)
      ? { style: () => ({ opacity: 0.5 }) }
      : { onPress: onViewItem };

    return (
      <Card padding={0} margin={0} justifyContent="flex-start" {...cardProps}>
        <HorizontalCardItem key={item.id} {...item} />
      </Card>
    );
  };

  renderSeparator() {
    return <Box flex={1} marginHorizontal={0.5} />;
  }

  renderHeader = () => {
    return (
      <Box flexDirection="row" justifyContent="space-between" padding={1}>
        <Text size={this.props.headerTitleSize || 2}>
          {this.props.headerTitle}
        </Text>
        {this.props.headerRight && this.props.headerRight}
      </Box>
    );
  };

  render() {
    return (
      <Box flex={1}>
        {this.props.headerTitle && this.renderHeader()}

        <ListView
          contentContainerStyle={{ paddingHorizontal: 10 }}
          dataSource={this.state.ds}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          horizontal
          initialListSize={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </Box>
    );
  }
}

export default compose(showNoContentViewIf(isEmptyProp('items')))(
  HorizontalCardList,
);
