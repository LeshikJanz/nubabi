// @flow
import React, { PureComponent } from 'react';
import { FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import { Box, Icon } from '../components';
import theme from 'core/themes/defaultTheme';
import { keyExtractor } from 'core/helpers/graphqlUtils';
import { stickersList } from './SuggestedMemoriesList';

type Props = {
  selectedSticker: ?string,
  onSelectSticker: (stickerId: ?string) => void,
};

class Stickers extends PureComponent<Props> {
  renderItem = ({ item }) => {
    const isSelected = this.props.selectedSticker === item.id;
    const selectSticker = () =>
      this.props.onSelectSticker(isSelected ? null : item.id);

    return (
      <Box as={TouchableWithoutFeedback} onPress={selectSticker} flex={1}>
        <Box
          flex={1}
          contentSpacing
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          borderBottomWidth={1}
          borderRightWidth={1}
          borderColor="separator"
        >
          <Icon
            name={`ios-radio-button-${isSelected ? 'on' : 'off'}`}
            color={isSelected ? theme.colors.primary : theme.colors.gray}
            size={24}
            style={{}}
          />
          <Image
            source={item.image}
            style={{ flex: 1, width: 60, height: 60, marginRight: 32 }}
            resizeMode="contain"
          />
        </Box>
      </Box>
    );
  };

  render() {
    return (
      <FlatList
        data={stickersList}
        numColumns={2}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        extraData={this.props.selectedSticker}
      />
    );
  }
}

const selector = formValueSelector('memory');
export default compose(
  connect(
    (state: State) => ({
      selectedSticker: selector(state, 'suggestedMemoryType'),
    }),
    dispatch => ({
      onSelectSticker: stickerId =>
        dispatch(change('memory', 'suggestedMemoryType', stickerId)),
    }),
  ),
)(Stickers);
