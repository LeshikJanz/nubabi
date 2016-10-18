import React, { Component } from 'react';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';

import { CHANGE_TAB } from '../../constants/actionTypes';
import Stimulation from '../../components/stimulation';
import Growth from '../../components/growth';
import Profile from '../../components/profile';
import Library from '../../components/library';
import Memories from '../../components/memories';
import NubabiIcon from '../../icons/nubabi';
import { LIGHT_GREY } from '../../constants/colours';

class Tabs extends Component {
  _handleAction(action) {
    this.props.onNavigate(action);
  }

  _changeTab(tabIndex) {
    this._handleAction({ type: CHANGE_TAB, index: tabIndex });
  }

  _renderTabContent(key) {
    switch (key) {
      case 'stimulation':
        return (
          <Stimulation />
      );
      case 'growth':
        return (
          <Growth />
      );
      case 'library':
        return (
          <Library />
      );
      case 'memories':
        return (
          <Memories />
      );
      default:
        return (
          <Profile />
        );
    }
  }

  render() {
    const tabBar = this.props.navigation.routes.map((tab, i) => {
      const size = (tab.key === 'profile') ? 40 : 18;
      const tabStyle = (tab.key === 'profile' ? styles.middleTabButton : '');
      let icon;
      if (tab.key === 'profile') {
        icon = (
          <View style={styles.tabIconOuterView}>
            <View style={styles.tabIconInnerView}>
              <View style={styles.tabIconInnerImageHolder}>
                <Image source={this.props.baby.avatar} style={styles.tabIconImage} />
              </View>
            </View>
            <View style={styles.tabSquare} />
          </View>
        );
      } else {
        icon = (
          <NubabiIcon
            name={tab.icon}
            size={size}
            color={LIGHT_GREY}
          />
        );
      }
      let selectedIcon;
      if (tab.key === 'profile') {
        selectedIcon = (
          <View style={styles.tabIconOuterView}>
            <View style={[styles.tabIconInnerView, { backgroundColor: 'rgba(234,49,84,0.6)' }]}>
              <View style={styles.tabIconInnerImageHolder}>
                <Image source={this.props.baby.avatar} style={styles.tabIconImage} />
              </View>
            </View>
            <View style={styles.tabSquare} />
          </View>
        );
      } else {
        selectedIcon = (
          <NubabiIcon
            name={tab.icon}
            size={size}
            color="rgba(234,49,84,0.6)"
            style={tabStyle}
          />
        );
      }
      return (
        <TabNavigator.Item
          key={tab.key}
          selected={this.props.navigation.index === i}
          title={tab.key === 'profile' ? null : tab.title}
          renderIcon={() => icon}
          renderSelectedIcon={() => selectedIcon}
          onPress={() => this._changeTab(i)}
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.selectedTabTitle}
        >
          {this._renderTabContent(tab.key)}
        </TabNavigator.Item>
      );
    });
    return (
      <TabNavigator
        tabBarShadowStyle={{ backgroundColor: '#e6e9f0', height: 1, zIndex: -1 }}
        tabBarStyle={{ backgroundColor: '#fff' }}
      >
        {tabBar}
      </TabNavigator>
    );
  }
}

Tabs.propTypes = {
  navigation: React.PropTypes.object.isRequired,
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
  tabTitle: {
    color: '#7d8a9b',
  },
  selectedTabTitle: {
    color: '#f2879b',
  },
  tabSquare: {
    width: 90,
    height: 60,
    backgroundColor: '#fff',
    marginTop: -48,
    marginLeft: -20,
    zIndex: -2,
  },
  tabIconOuterView: {
    width: 80,
    borderWidth: 1,
    borderColor: '#e6e9f0',
    height: 80,
    bottom: -30,
    borderRadius: 80 / 2,
    padding: 13,
    margin: 0,
    backgroundColor: '#fff',
    zIndex: -3,
  },
  tabIconInnerView: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    padding: 2,
    margin: 0,
    backgroundColor: '#fff',
    marginTop: -4,
    zIndex: 300,
  },
  tabIconInnerImageHolder: {
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    padding: 4,
    borderRadius: 48 / 2,
    zIndex: 300,
  },
  tabIconImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    resizeMode: 'stretch',
    zIndex: 300,
  },
  middleTabButton: {
    backgroundColor: 'red',
  },
  tabbar: {
    backgroundColor: '#fff',
    height: 50,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  tabText: {
    fontSize: 10,
    width: 30,
    textAlign: 'left',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

