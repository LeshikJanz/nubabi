import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { POP_ROUTE } from '../constants/actionTypes';
import { NUBABI_RED } from '../constants/colours';

const window = Dimensions.get('window');

class ChooseBaby extends Component {
  constructor(props) {
    super(props);
    this._handleBack = this._handleBack.bind(this);
  }

  _handleBack() {
    this.props.onNavigate({ type: POP_ROUTE });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chooseContainer} />
        <View style={styles.babyContainer}>
          <ScrollView
            style={{
              height: 80,
              width: window.width,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 5,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <View style={styles.babyIconContainerView}>
              <View style={styles.babyIconView}>
                <Image source={this.props.baby.avatar} style={styles.babyIcon} />
              </View>
              <Text style={styles.babyName}>{this.props.baby.name}</Text>
            </View>
          </ScrollView>
        </View>
        <Icon
          name="ios-add-circle"
          size={40}
          color={NUBABI_RED}
          style={{ marginTop: -60, width: 40 }}
        />
      </View>
    );
  }
}

ChooseBaby.propTypes = {
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
    navigation: state.tabReducer,
    baby: state.babyReducer,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  chooseContainer: {
    top: 0,
    backgroundColor: '#fff',
    height: 900,
    width: 900,
    borderRadius: 900 / 2,
    marginTop: -750,
  },
  babyContainer: {
    left: 0,
    top: 0,
    position: 'absolute',
    width: window.width,
    alignItems: 'center',
    height: 150,
  },
  babyIconContainerView: {
    flex: 1,
    alignItems: 'center',
  },
  babyIconView: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  babyIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    resizeMode: 'stretch',
  },
  babyName: {
    fontSize: 10,
    color: NUBABI_RED,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseBaby);
