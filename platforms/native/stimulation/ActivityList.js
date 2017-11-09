// @flow
import type { ActivityEdge } from '../../../core/types';
import type { DataSource } from 'react-native';
import { ListView, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { gql } from 'react-apollo';
import ActivityListItem from './ActivityListItem';
import { PANEL_BACKGROUND } from '../../../core/themes/defaultTheme';
import withPullToRefresh from '../components/withPullToRefresh';

type Props = {
  activities: Array<ActivityEdge>,
  onActivityItemPress: (id: string, title: string, cursor: string) => void,
  emptyMessage?: string,
  onLoadMore?: () => void,
};

class ActivityList extends PureComponent {
  props: Props;
  state: {
    shouldScrollToBottom: boolean,
    ds: DataSource,
  };

  static fragments = {
    activities: gql`
      fragment ActivityList on Activity {
        id
        name
        skillArea {
          id
          name
          image {
            thumb {
              url
            }
          }
          icon
          completedIcon
        }
        equipment
        isCompleted
      }
    `,
  };

  static defaultProps = {
    emptyMessage: 'No activities were found yet.',
  };

  constructor(props: Props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      ds: ds.cloneWithRows(props.activities),
      shouldScrollToBottom: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.activities !== this.props.activities) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.activities),
      });
    }
  }

  onContentSizeChange = () => {
    if (this.state.shouldScrollToBottom && this.listView) {
      this.listView.scrollToEnd({ animated: true });
      this.setState({ shouldScrollToBottom: false });
    }
  };

  onLoadMore = () => {
    if (this.props.onLoadMore) {
      this.props.onLoadMore();
    }
  };

  listView = null;

  renderRow = (edge: ActivityEdge) => {
    const activity = edge.node;

    if (!activity) {
      return null;
    }

    const cursor = edge.cursor;
    const { skillArea } = activity;

    return (
      <ActivityListItem
        key={activity.id}
        activity={activity}
        skillArea={skillArea}
        onPress={() =>
          this.props.onActivityItemPress(activity.id, activity.name, cursor)
        }
      />
    );
  };

  renderItems() {
    if (!this.props.activities.length) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <Text>{this.props.emptyMessage}</Text>
        </View>
      );
    }

    const { handleRefresh, refreshing } = this.props;

    return (
      <ListView
        ref={ref => {
          this.listView = ref;
        }}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        dataSource={this.state.ds}
        onContentSizeChange={this.onContentSizeChange}
        onEndReached={this.onLoadMore}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    );
  }

  render() {
    return <View style={styles.container}>{this.renderItems()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PANEL_BACKGROUND,
    flexDirection: 'column',
  },
  scrollContainer: {
    paddingBottom: 15,
  },
});

export default compose(withPullToRefresh)(ActivityList);
