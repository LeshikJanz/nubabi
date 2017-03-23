import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import NubabiIcon from '../../../common/icons/nubabi';
import { NUBABI_RED, FONT_COLOR } from '../../../common/themes/defaultTheme';
import CoverImage from '../Header/CoverImage';
import IconHeader from '../Header/IconHeader';
import GenderSelection from './GenderSelection';

class EditBaby extends Component {
  constructor(props) {
    super(props);
    this.state = props.baby;
  }

  render() {
    const range = (start, end) => [...Array((end - start) + 1)].map((_, i) => start + i);
    const weekOptions = range(32, 43).map((val) => {
      return <Picker.Item label={val.toString()} value={val} key={val.toString()} />;
    });
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={this.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <CoverImage coverImage={this.props.baby.avatar_thumb} />
          <IconHeader avatar={this.props.baby.avatar_thumb} />
          <View style={styles.changeAvatarContainer}>
            <View style={styles.changeAvatarView}>
              <View style={styles.changeAvatarInnerView}>
                <Icon
                  name="ios-camera-outline"
                  style={styles.changeAvatarIcon}
                />
              </View>
            </View>
          </View>
          <View style={styles.changeCoverPhotoView}>
            <NubabiIcon
              style={
                [styles.changeCoverPhotoIcon]
              }
              name="editProfile"
            />
            <Text style={styles.changeCoverPhotoText}>Change Cover Photo</Text>
          </View>
        </View>
        <GenderSelection
          selectedGender={this.state.gender}
          onChangeGender={gender => this.setState({ gender })}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>NAME</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>BORN ON</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.birth_date}
            onChangeText={text => this.setState({ birth_date: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>RELATIONSHIP TO ME</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.relationship}
            onChangeText={text => this.setState({ relationship: text })}
          />
        </View>
        <View style={[styles.inputContainer, { height: 180 }]}>
          <Text style={styles.inputLabel}>WEEK BABY BORN</Text>
          <Picker
            selectedValue={this.state.week_born}
            onValueChange={week => this.setState({ week_born: week })}
            style={styles.pickerInput}
          >
            {weekOptions}
          </Picker>
        </View>
        <View style={styles.submitButtonContainer}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>SAVE BABY</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

EditBaby.propTypes = {
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
    navigation: state.navigation,
    baby: state.babies.items[state.babies.index],
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'stretch',
    height: 210,
    paddingBottom: 15,
    marginBottom: 20,
  },
  changeAvatarContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 45,
    marginTop: -10,
  },
  changeAvatarView: {
    height: 24,
    width: 24,
    borderRadius: 24 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeAvatarInnerView: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: NUBABI_RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeAvatarIcon: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  changeCoverPhotoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  changeCoverPhotoIcon: {
    marginTop: 0,
    marginRight: 5,
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'transparent',
  },
  changeCoverPhotoText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 10,
    marginRight: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 40,
    marginHorizontal: 30,
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: '#eff1f7',
  },
  textInput: {
    flex: 1,
    color: FONT_COLOR,
    fontSize: 16,
  },
  pickerInput: {
    marginTop: -30,
  },
  inputLabel: {
    fontSize: 8,
    color: '#a8b3c2',
    marginBottom: 4,
  },
  submitButtonContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
  },
  submitButton: {
    backgroundColor: NUBABI_RED,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 15,
  },
  submitText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBaby);
