// @flow
import type { ActivityConnection } from 'core/types';
import React, { PureComponent } from 'react';
import { path } from 'ramda';
import { GrossIcon } from 'web/assets/images';
import ActivityMenu from '../../containers/activity/ActivityMenu';
import * as ActivityStatusStyled from '../../styled/activity/ActivityStatusStyled';

type Props = {
  activity: ActivityConnection,
  currentBabyId: string,
  handleGlobalLoadingSuccess: Function,
  handleGlobalLoadingError: Function,
  handleMenu: Function,
  history: { push: Function },
};

class ActivityStatus extends PureComponent<Props> {
  refreshActivity = ({ data }) => {
    const newActivity =
      path(['swoopActivity', 'newActivity'], data) ||
      path(['changeActivity', 'newActivity'], data);

    if (newActivity) {
      this.props.history.push(`/activity/${newActivity.id}`);
    }

    this.props.handleGlobalLoadingSuccess();
  };

  handleActivity = activityAction => {
    let input = {
      id: this.props.activity.id,
      babyId: this.props.currentBabyId,
    };

    if (activityAction.level) {
      input = { ...input, level: activityAction.level };
    }

    return this.props[activityAction.callback]({
      variables: { input },
    })
      .then(this.refreshActivity)
      .catch(this.props.handleGlobalLoadingError);
  };

  render() {
    return (
      <ActivityStatusStyled.Wrapper>
        <ActivityStatusStyled.IconWrapper>
          <GrossIcon />
        </ActivityStatusStyled.IconWrapper>
        <ActivityStatusStyled.Content>
          <ActivityStatusStyled.SkittlesName>
            Skittles
          </ActivityStatusStyled.SkittlesName>
          <ActivityStatusStyled.Text>
            Adjust the level of activity for Charlotte:
          </ActivityStatusStyled.Text>
        </ActivityStatusStyled.Content>

        <ActivityMenu
          handlActivityMenu={this.props.handleMenu}
          handleActivity={this.handleActivity}
          isCompleted={this.props.activity.isCompleted}
        />
      </ActivityStatusStyled.Wrapper>
    );
  }
}

export default ActivityStatus;
