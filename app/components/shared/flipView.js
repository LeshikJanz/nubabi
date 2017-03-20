import React, { Component } from 'react';
import {
  Animated,
  TouchableOpacity,
} from 'react-native';

const styles = {
  animatedContainer: {
    flex: 1,
  },
};

class FlipCard extends Component {
  constructor(props) {
    super(props);
    this._flipToggleCard = this._flipToggleCard.bind(this);
    this.state = {
      animatedValue: new Animated.Value(0),
      isFlipped: true,
    };
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.isFlipped !== prevState.isFlipped) {
      this._flippedCard();
    }
  }

  _flipToggleCard() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  _flippedCard() {
    Animated.spring(this.state.animatedValue, {
      toValue: 0,   // Returns to the start
      velocity: this.props.velocity,  // Velocity makes it move
      tension: this.props.tension, // Slow
      friction: this.props.friction,  // Oscillate a lot
    }).start();
  }

  flippedCardView(isFlipped) {
    if (isFlipped) {
      return this.props.renderFront;
    }
    return this.props.renderBack;
  }

  render() {
    const rotateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <TouchableOpacity onPress={this._flipToggleCard} style={styles.animatedContainer}>
        <Animated.View
          style={[styles.animatedContainer, { transform: [{ rotateX }] }]}
        >
          {this.flippedCardView(this.state.isFlipped)}
        </Animated.View>
      </TouchableOpacity>);
  }
}

FlipCard.propTypes = {
  renderBack: React.PropTypes.object.isRequired,
  renderFront: React.PropTypes.object.isRequired,
  velocity: React.PropTypes.number.isRequired,
  tension: React.PropTypes.number.isRequired,
  friction: React.PropTypes.number.isRequired,
};

module.exports = FlipCard;
