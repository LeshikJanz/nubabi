// @flow
import type { ActivityConnection } from 'core/types';
import React, { PureComponent } from 'react';
import ActivityItem from 'web/elements/ActivityItem';
import * as ActivityListStyled from '../styled/ActivityListStyled';
import { MIN_Y_OFFSET } from '../../../constants/index';

type Props = {
  activities: ActivityConnection[],
  switchable: boolean,
  backLink: string,
  history: { push: Function },
  onLoadMore: Function,
};

class ActivityList extends PureComponent<Props> {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  getScrollHeight = () =>
    Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );

  getPageYOffset = () => window.pageYOffset;

  handleNavigateToActivity = ({ id }) => {
    this.props.history.push({
      pathname: `/activity/${id}`,
      state: {
        switchable: this.props.switchable,
        backLink: this.props.backLink,
      },
    });
  };

  handleScroll = () => {
    const isNeededMoreEntities =
      this.getScrollHeight() - this.getPageYOffset() - MIN_Y_OFFSET <= 0;

    if (this.props.onLoadMore && isNeededMoreEntities) {
      this.props.onLoadMore();
    }
  };

  render() {
    return (
      <ActivityListStyled.List>
        {this.props.activities.map(({ node }) => (
          <ActivityItem
            key={node.id}
            activity={node}
            handleClick={this.handleNavigateToActivity}
            switchable={this.props.switchable}
          />
        ))}
      </ActivityListStyled.List>
    );
  }
}

export default ActivityList;
