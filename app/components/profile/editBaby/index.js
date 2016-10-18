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

import NubabiIcon from '../../../icons/nubabi';
import { NUBABI_RED, FONT_COLOR } from '../../../constants/colours';
import CoverImage from '../header/coverImage';
import IconHeader from '../header/iconHeader';
import GenderSelection from './genderSelection';

class EditBaby extends Component {
  constructor(props) {
    super(props);
    this.state = props.baby;
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={this.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <CoverImage coverImage={this.props.baby.coverImage} />
          <IconHeader avatar={this.props.baby.avatar} />
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
            value={this.state.birthDate}
            onChangeText={text => this.setState({ birthDate: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>RELATIONSHIP TO ME</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.relationshipToMe}
            onChangeText={text => this.setState({ relationshipToMe: text })}
          />
        </View>
        <View style={[styles.inputContainer, { height: 180 }]}>
          <Text style={styles.inputLabel}>WEEK BABY BORN</Text>
          <Picker
            selectedValue={this.state.weekBorn}
            onValueChange={week => this.setState({ weekBorn: week })}
            style={styles.pickerInput}
          >
            <Picker.Item label="31" value={31} key="31" />
            <Picker.Item label="32" value={32} key="32" />
            <Picker.Item label="33" value={33} key="33" />
            <Picker.Item label="34" value={34} key="34" />
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
    navigation: state.navigationReducer,
    baby: state.babyReducer,
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
