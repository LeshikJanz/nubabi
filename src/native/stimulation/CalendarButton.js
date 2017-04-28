import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import theme from '../../common/themes/defaultTheme';

const icon = require('../../common/images/calendar.png');

class CalendarButton extends Component {
  renderWeekdays() {
    // TODO: locales maybe?
    const startOfWeekDate = moment().startOf('isoweek');
    const endOfWeekDate = moment().endOf('isoweek');

    // We include the abbreviation of the previous month if the week
    // started last month
    const startOfWeek = startOfWeekDate.format(
      startOfWeekDate.month() < endOfWeekDate.month() ? 'MMM D' : 'D',
    );

    const endOfWeek = endOfWeekDate.format('D');
    const endMonth = endOfWeekDate.format('MMMM YYYY');

    return (
      <View style={styles.textContainer}>
        <Text style={theme.subheader}>
          {startOfWeek} - {endOfWeek}
        </Text>
        <Text style={theme.subheader}>
          {endMonth}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container} {...this.props}>
        <Image source={icon} style={styles.icon} />

        {this.renderWeekdays()}
      </View>
    );
  }
}

const HEIGHT = 66;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    height: HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 30,
    marginRight: 20,
  },
});

export default CalendarButton;
