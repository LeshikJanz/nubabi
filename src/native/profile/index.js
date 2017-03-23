import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import { PUSH_ROUTE } from '../../common/actionTypes';
import { PANEL_BACKGROUND } from '../../common/themes/defaultTheme';
import Measurement from './Measurement';
import Header from './Header';
import Achievements from './Achievements';
import RecentMemories from './RecentMemories';

class Profile extends Component {
  constructor(props) {
    super(props);
    this._handleEditBaby = this._handleEditBaby.bind(this);
  }

  _handleAction(action) {
    this.props.onNavigate(action);
  }

  _handleEditBaby() {
    return this._handleAction({ type: PUSH_ROUTE, route: { key: 'editBaby', title: 'Edit Baby' } });
  }

  render() {
    const baby = this.props.babies.items[this.props.babies.index];
    // TODO: empty state
    if (!baby) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>No baby</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
        >
          <Header
            coverImage={baby.avatar_thumb}
            avatar={baby.avatar_thumb}
            babyName={baby.name}
            birthDate={baby.birth_date}
            onEditBaby={this._handleEditBaby}
          />
          <View style={styles.measurementsRow}>
            <Measurement
              amount={baby.weight}
              header="Weight"
              unit="kg"
              iconName="weight"
              onUpdate={() => (null)}
            />
            <Measurement
              amount={baby.height}
              header="Height"
              unit="cm"
              iconName="height"
              onUpdate={() => (null)}
            />
          </View>
          <Achievements />
          <RecentMemories memories={baby.memories} />
        </ScrollView>
      </View>
    );
  }
}

Profile.propTypes = {
  onNavigate: React.PropTypes.func.isRequired,
  babies: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation,
    babies: state.babies,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PANEL_BACKGROUND,
  },
  scrollContainer: {
    flex: 1,
  },
  measurementsRow: {
    height: 97,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
