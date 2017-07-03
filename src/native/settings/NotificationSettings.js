// @flow
import React, { PureComponent } from 'react';
import { partial } from 'ramda';
import { Box, List, ListItem, ListItemSeparator, Text } from '../components';

class NotificationSettings extends PureComponent {
  state = {
    memoriesEnabled: true,
    stimulationEnabled: true,
    growthEnabled: true,
    activityRemindersEnabled: false,
    emailEnabled: true,
  };

  toggle = (setting: string, value: boolean) => {
    this.setState({ [setting]: value });
  };

  toggleMemories = partial(this.toggle, ['memoriesEnabled']);
  toggleStimulation = partial(this.toggle, ['stimulationEnabled']);
  toggleGrowth = partial(this.toggle, ['growthEnabled']);
  toggleActivities = partial(this.toggle, ['activityRemindersEnabled']);
  toggleEmail = partial(this.toggle, ['emailEnabled']);

  render() {
    return (
      <Box flex={1}>
        <List>
          <Box contentSpacing>
            <Text color="secondary">PUSH NOTIFICATIONS</Text>
          </Box>
          <ListItem
            rightToggle={this.state.memoriesEnabled}
            onRightTogglePress={this.toggleMemories}
          >
            <Text color="secondary">Memories</Text>
          </ListItem>
          <ListItem
            rightToggle={this.state.stimulationEnabled}
            onRightTogglePress={this.toggleStimulation}
          >
            <Text color="secondary">Stimulation</Text>
          </ListItem>
          <ListItem
            rightToggle={this.state.growthEnabled}
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
            rightToggle={this.state.activityRemindersEnabled}
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
            rightToggle={this.state.emailEnabled}
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

export default NotificationSettings;
