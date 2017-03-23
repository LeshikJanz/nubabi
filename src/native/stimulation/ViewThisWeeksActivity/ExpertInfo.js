import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

import FlipCard from '../../shared/FlipView';
import { LIGHT_GREY } from '../../../common/themes/defaultTheme';

const width = Dimensions.get('window').width;
const infoIcon = require('../../../common/images/info_icon.png');

class ExpertInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  _renderFront = () => {
    const firstName = _.first(this.props.expert.name.split(' '));
    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Our expert {firstName} says:</Text>
        <Image source={this.props.expert.image_thumbnail} style={styles.avatar} />
        <Text style={styles.descriptionText}>{this.props.activity.description}</Text>
        <View style={styles.expertDescriptionButton}>
          <Text style={styles.expertDescriptionName}>{this.props.expert.name}</Text>
          <Text style={styles.expertDescriptionProfession}>{this.props.expert.profession}</Text>
          <Image style={styles.infoIcon} source={infoIcon} />
        </View>
      </View>
    );
  };

  _renderBack = () => {
    return (
      <View style={styles.biographyContainer}>
        <Image source={this.props.expert.image_thumbnail} style={styles.biographyAvatar} />
        <Text style={styles.expertBiographyName}>{this.props.expert.name}</Text>
        <Text style={styles.expertDescriptionProfession}>{this.props.expert.profession}</Text>
        <Text style={styles.biographyText}>{this.props.expert.biography}</Text>
        <Icon
          name="ios-close"
          size={30}
          color={LIGHT_GREY}
          style={styles.closeBiographyButton}
        />
      </View>
    );
  };

  render() {
    return (
      <FlipCard
        style={{ flex: 1 }}
        velocity={4}
        tension={7}
        friction={5}
        renderFront={this._renderFront()}
        renderBack={this._renderBack()}
      />
    );
  }
}

ExpertInfo.propTypes = {
  expert: React.PropTypes.object.isRequired,
  activity: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  flipViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 1,
    },

  },
  biographyContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 1,
    },
    alignItems: 'center',
    flex: 1,
  },
  descriptionHeader: {
    color: '#454D56',
    fontSize: 18,
    marginBottom: 20,
  },
  avatar: {
    position: 'absolute',
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    top: 10,
    right: 10,
    borderRadius: 20,
  },
  biographyAvatar: {
    width: 60,
    height: 60,
    resizeMode: 'stretch',
    borderRadius: 30,
  },
  descriptionText: {
    color: '#6A7683',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 10,
  },
  biographyText: {
    color: '#6A7683',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  expertDescriptionButton: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#EDF1FA',
  },
  expertDescriptionName: {
    color: '#748294',
    fontSize: 14,
    fontWeight: '500',
  },
  expertBiographyName: {
    color: '#6A7683',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  expertDescriptionProfession: {
    color: '#748294',
    fontSize: 14,
    marginTop: 4,
  },
  infoIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: 10,
    top: 20,
  },
  nextButtonsContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    width,
    height: 60,
    flexDirection: 'row',
  },
  closeBiographyButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: 'transparent',
  },
});

export default ExpertInfo;
