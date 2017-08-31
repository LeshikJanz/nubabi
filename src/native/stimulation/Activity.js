// @flow
import type { Activity as ActivityType } from '../../common/types';
import React, { PureComponent } from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { path } from 'ramda';
import { gql } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';
import ActivityContainer from './ActivityContainer';
import ActivityActions from './ActivityActions';
import theme, { PANEL_BACKGROUND } from '../../common/themes/defaultTheme';
import {
  childContextTypes,
  getChildContext,
  getLayoutInitialState,
  handleLayout,
} from '../components/withLayout';
import iconMappings from './iconMappings';
import Header from './Header';
import Steps from './Steps';
import ExpertInfo from './ExpertInfo';

type ActivityProps = {
  activity: ActivityType,
  babyName: string,
  isFavorite: boolean,
  onToggleFavorite: () => void,
  enableActions: boolean,
  enableNavigation: boolean,
  onActivityMediaPress?: () => void,
  isLoading?: boolean,
};

type ActivityActionProps = {
  onSwoop?: () => void,
  onLevelIncrease?: () => void,
  onLevelDecrease?: () => void,
};

type ActivityNavigationProps = {
  onActivityMediaPress: () => void,
  onPreviousActivity?: () => void,
  onNextActivity?: () => void,
  previousSkillAreaName?: string,
  nextSkillAreaName?: string,
};

type Props = ActivityProps & ActivityNavigationProps & ActivityActionProps;

export class Activity extends PureComponent {
  props: Props;

  state = {
    ...getLayoutInitialState(),
  };

  static defaultProps = {
    enableNavigation: false,
    enableActions: false,
  };

  static fragments = {
    activity: gql`
      fragment Activity on Activity {
        id
        ...HeaderActivity
        ...ExpertInfoActivity
        ...ActivityActionsActivity
        expert {
          ...ExpertInfo
        }
        skillArea {
          id
          name
          image {
            large {
              url
            }
          }
          ...HeaderSkill
          ...ActivityActionsSkill
        }
        ...Steps
      }

      ${Header.fragments.skillArea}
      ${Header.fragments.activity}
      ${ExpertInfo.fragments.expert}
      ${ExpertInfo.fragments.activity}
      ${Steps.fragments.steps}
      ${ActivityActions.fragments.activity}
      ${ActivityActions.fragments.skill}
    `,

    activityNavigation: gql`
      fragment ActivityNavigation on ActivityConnection {
        edges {
          cursor
          node {
            id
            name
            skillArea {
              id
              name
            }
          }
        }
      }
    `,
  };

  scrollView = null;

  static childContextTypes = childContextTypes;

  getChildContext = getChildContext.bind(this);

  handleLayout = handleLayout.bind(this);

  scrollToTop = () => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ x: 0, y: 0, animated: false });
    }
  };

  componentWillUpdate(nextProps: Props) {
    if (nextProps.activity.id !== this.props.activity.id) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.scrollToTop();
    }
  }

  handlePreviousActivity = () => {
    /* $FlowFixMe */
    this.props.onPreviousActivity();
  };

  handleNextActivity = () => {
    /* $FlowFixMe */
    this.props.onNextActivity();
  };

  handleLevelIncrease = () => {
    /* $FlowFixMe */
    this.props.onLevelIncrease();
  };

  handleLevelDecrease = () => {
    /* $FlowFixMe */
    this.props.onLevelDecrease();
  };

  handleSwoop = () => {
    /* $FlowFixMe */
    this.props.onSwoop();
  };

  renderPreviousButton() {
    return (
      <TouchableHighlight
        onPress={this.handlePreviousActivity}
        underlayColor="rgba(0,0,0,0)"
        style={styles.previousButton}
      >
        <View style={styles.buttonContainer}>
          <Icon name="md-arrow-back" style={styles.navigationIcon} />
          <View style={[styles.navigationSkillContainer, { marginLeft: 10 }]}>
            <Text style={styles.previousButtonText}>Back</Text>
            <Text>
              {this.props.previousSkillAreaName}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderNextButton() {
    return (
      <TouchableHighlight
        onPress={this.handleNextActivity}
        underlayColor="rgba(0,0,0,0)"
        style={styles.nextButton}
      >
        <View style={styles.buttonContainer}>
          <View style={[styles.navigationSkillContainer, { marginRight: 10 }]}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Text style={{ textAlign: 'right' }}>
              {this.props.nextSkillAreaName}
            </Text>
          </View>
          <Icon name="md-arrow-forward" style={styles.navigationIcon} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      activity,
      babyName,
      isFavorite,
      enableNavigation,
      enableActions,
      isLoading,
    } = this.props;

    const skill = activity.skillArea;
    const { expert } = activity;

    const activityMedia = path(
      ['media', 'edges', '0', 'node', 'url'],
      activity,
    );

    const activityThumb = path(
      ['media', 'edges', '0', 'node', 'thumb'],
      activity,
    );

    const activityMediaType = path(
      ['media', 'edges', '0', 'node', 'type'],
      activity,
    );

    return (
      <ActivityContainer isLoading={isLoading}>
        <View style={styles.container} onLayout={this.handleLayout}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{
              alignItems: 'stretch',
              justifyContent: 'flex-start',
            }}
            keyboardShouldPersistTaps="handled"
            pagingEnabled={false}
            ref={ref => {
              this.scrollView = ref;
            }}
          >
            <Header
              skillName={skill.name}
              skillImage={skill.image.large}
              activityName={activity.name}
              isFavoriteActivity={isFavorite}
              onToggleFavorite={this.props.onToggleFavorite}
            />

            <ExpertInfo
              expert={expert}
              activityDescription={activity.introduction}
            />

            <Steps
              steps={activity.steps}
              activityName={activity.name}
              activityMedia={activityMedia}
              activityMediaThumbnail={activityThumb}
              activityMediaType={activityMediaType}
              onActivityMediaPress={this.props.onActivityMediaPress}
            />

            {enableActions &&
              <ActivityActions
                babyName={babyName}
                activityName={activity.name}
                skillIcon={iconMappings(skill.icon)}
                onSwoop={this.handleSwoop}
                onIncrease={this.handleLevelIncrease}
                onDecrease={this.handleLevelDecrease}
              />}
            {enableNavigation &&
              <View style={styles.nextButtonsContainer}>
                {this.renderPreviousButton()}
                {this.renderNextButton()}
              </View>}
          </ScrollView>
        </View>
      </ActivityContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PANEL_BACKGROUND,
  },
  scrollContainer: {
    flex: 1,
    //marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  nextButtonsContainer: {
    flex: 0.1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
  },
  navigationSkillContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  nextButton: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#E9ECF4',
    padding: 10,
  },
  previousButton: {
    flex: 1,
    padding: 10,
  },
  nextButtonText: {
    color: theme.colors.secondary,
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
  },
  previousButtonText: {
    color: theme.colors.secondary,
    fontSize: 14,
    marginBottom: 10,
  },
  navigationIcon: {
    fontSize: 25,
    color: theme.colors.secondary,
    alignSelf: 'center',
  },
});

export default Activity;
