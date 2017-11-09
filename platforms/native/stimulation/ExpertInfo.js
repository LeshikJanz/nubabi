// @flow
import type { Expert, LayoutProps } from '../../../core/types/index';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { gql } from 'react-apollo';
import { path, head } from 'ramda';
import FlipCard from '../shared/FlipView';
import withLayout from '../components/withLayout';
import theme from '../../../core/themes/defaultTheme';

type Props = {
  expert: Expert,
  activityDescription: string,
  layout: LayoutProps,
};

export class ExpertInfo extends Component {
  props: Props;

  state = {
    isFlipped: false,
  };

  static fragments = {
    expert: gql`
      fragment ExpertInfo on Expert {
        id
        name
        discipline
        avatar {
          url
        }
        biography
      }
    `,
    activity: gql`
      fragment ExpertInfoActivity on Activity {
        introduction
      }
    `,
  };

  renderFront = onFlip => {
    const firstName = head(this.props.expert.name.split(' '));
    const avatar = { uri: path(['avatar', 'url'], this.props.expert) };

    return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>
          Our expert {firstName} says:
        </Text>
        <Image source={avatar} style={styles.avatar} resizeMode="stretch" />
        <Text style={styles.descriptionText}>
          {this.props.activityDescription}
        </Text>
        <View style={styles.expertDescriptionButton}>
          <Text style={styles.expertDescriptionName}>
            {this.props.expert.name}
          </Text>
          <Text style={styles.expertDescriptionProfession}>
            {this.props.expert.discipline}
          </Text>
          <TouchableOpacity style={styles.infoIcon} onPress={onFlip}>
            <Icon
              name="md-information-circle"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderBack = onFlip => {
    return (
      <View style={styles.biographyContainer}>
        <TouchableOpacity
          onPress={onFlip}
          style={{ alignSelf: 'flex-end', flex: 1 }}
        >
          <Icon name="ios-close-circle" color={theme.colors.gray} size={24} />
        </TouchableOpacity>
        <Image
          source={{ uri: this.props.expert.avatar.url }}
          style={styles.biographyAvatar}
          resizeMode="stretch"
        />
        <Text style={styles.expertBiographyName}>{this.props.expert.name}</Text>
        <Text style={styles.expertDescriptionProfession}>
          {this.props.expert.discipline}
        </Text>
        <Text style={styles.biographyText}>{this.props.expert.biography}</Text>
      </View>
    );
  };

  render() {
    const width =
      this.props.layout.viewportWidth || Dimensions.get('window').width;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.open.white1,
          paddingTop: 20,
          marginTop: 0,
        }}
      >
        <FlipCard
          style={{ flex: 1 }}
          velocity={4}
          tension={7}
          friction={5}
          renderFront={onFlip => this.renderFront(onFlip)}
          renderBack={onFlip => this.renderBack(onFlip)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flipViewStyle: {
    flex: 1,
  },
  descriptionContainer: {
    marginLeft: 20,
    marginRight: 20,
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
  },
  biographyContainer: {
    marginLeft: 20,
    marginRight: 20,
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
    top: 10,
    right: 10,
    borderRadius: 20,
  },
  biographyAvatar: {
    width: 60,
    height: 60,
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
    position: 'absolute',
    right: 10,
    top: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  closeBiographyButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: 'transparent',
  },
});

export default withLayout(ExpertInfo);
