import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { PUSH_ROUTE } from '../../constants/actionTypes';
import Measurement from './measurement';
import Header from './header';
import Achievements from './achievements';
import RecentMemories from './recentMemories';

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
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
        >
          <Header
            coverImage={this.props.baby.coverImage}
            avatar={this.props.baby.avatar}
            babyName={this.props.baby.name}
            birthDate={this.props.baby.birthDate}
            onEditBaby={this._handleEditBaby}
          />
          <View style={styles.measurementsRow}>
            <Measurement
              amount={this.props.baby.weight}
              header="Weight"
              unit="kg"
              iconName="weight"
              onUpdate={() => (null)}
            />
            <Measurement
              amount={this.props.baby.height}
              header="Height"
              unit="cm"
              iconName="height"
              onUpdate={() => (null)}
            />
          </View>
          <Achievements />
          <RecentMemories memories={this.props.baby.memories} />
        </ScrollView>
      </View>
    );
  }
}

Profile.propTypes = {
  onNavigate: React.PropTypes.func.isRequired,
  baby: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    navigation: state.navigationReducer,
    baby: state.babyReducer,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fd',
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
