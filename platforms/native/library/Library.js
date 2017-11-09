// @flow
import type { NavigationProp, NavigationOptions } from '../../../core/types';
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import ArticleList from './ArticleCardList';
import HealthHelpButton from './HealthHelpButton';
import ParentingTipsButton from './ParentingTipsButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import theme from '../../../core/themes/defaultTheme';

type Props = {
  navigation: NavigationProp,
};

export class Library extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Explore',
  };

  handleBrowseArticles = () => {
    this.props.navigation.navigate('browseArticles');
  };

  handleViewArticle = (id: string) => {
    this.props.navigation.navigate('viewArticle', { id });
  };

  handleHealthHelp = () => {
    this.props.navigation.navigate('healthHelp');
  };

  handleParentingTips = () => {
    this.props.navigation.navigate('parentingTips');
  };

  render() {
    return (
      <Screen>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <ArticleList
            onBrowseAll={this.handleBrowseArticles}
            onViewArticle={this.handleViewArticle}
          />
          <Box flex={1} contentSpacing>
            <ParentingTipsButton onPress={this.handleParentingTips} />
          </Box>
          <Box flex={1} marginHorizontal={theme.contentSpacing.padding}>
            <HealthHelpButton onPress={this.handleHealthHelp} />
          </Box>
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}

export default Library;
