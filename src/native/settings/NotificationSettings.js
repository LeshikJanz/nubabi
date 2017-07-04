// @flow
import type { State } from '../../common/types';
import React, { PureComponent } from 'react';
import { compose, partial, pick } from 'ramda';
import { connect } from 'react-redux';
import { Box, List, ListItem, ListItemSeparator, Text } from '../components';
import { setSettingsValue } from '../../common/settings/reducer';

class NotificationSettings extends PureComponent {
  state = {
    memoriesEnabled: true,
    stimulationEnabled: true,
    growthEnabled: true,
    activityRemindersEnabled: false,
    emailEnabled: true,
  };

  toggle = (setting: string, value: boolean) => {
    this.props.setSettingsValue(['notifications', setting], value);
  };

  toggleMemories = partial(this.toggle, ['memories']);
  toggleStimulation = partial(this.toggle, ['stimulation']);
  toggleGrowth = partial(this.toggle, ['growth']);
  toggleActivities = partial(this.toggle, ['activities']);
  toggleEmail = partial(this.toggle, ['email']);

  render() {
    const { notifications } = this.props;

    return (
      <Box flex={1}>
        <List>
          <Box contentSpacing>
            <Text color="secondary">PUSH NOTIFICATIONS</Text>
          </Box>
          <ListItem
            rightToggle={notifications.memories}
            onRightTogglePress={this.toggleMemories}
          >
            <Text color="secondary">Memories</Text>
          </ListItem>
          <ListItem
            rightToggle={notifications.stimulation}
            onRightTogglePress={this.toggleStimulation}
          >
            <Text color="secondary">Stimulation</Text>
          </ListItem>
          <ListItem
            rightToggle={notifications.growth}
            onRightTogglePress={this.toggleGrowth}
            last
          >
            <Text color="secondary">Growth</Text>
          </ListItem>
          <ListItemSeparator />
          <Box contentSpacing>
            <Text color="secondary">ACTIVITY REMINDER</Text>
          </Box>
          <ListItem
            rightToggle={notifications.activities}
            onRightTogglePress={this.toggleActivities}
            last
          >
            <Text color="secondary">
              Remind me to complete my baby's stimulation activities
            </Text>
          </ListItem>
          <ListItemSeparator />
          <Box contentSpacing>
            <Text color="secondary">EMAIL NOTIFICATIONS</Text>
          </Box>
          <ListItem
            rightToggle={notifications.email}
            onRightTogglePress={this.toggleEmail}
            last
          >
            <Text color="secondary">
              Email me my baby's weekly stimulation activities
            </Text>
          </ListItem>
        </List>
      </Box>
    );
  }
}

export default compose(
  connect(({ settings }) => pick(['notifications'], settings), {
    setSettingsValue,
  }),
)(NotificationSettings);
