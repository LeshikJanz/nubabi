// @flow
import React, { Component } from 'react';
import {
  View,
  Animated,
} from 'react-native';

const styles = {
  animatedContainer: {
    flex: 1,
  },
};

type Props = {
  renderFront: Function,
  renderBack: Function,
  velocity: number,
  tension: number,
  friction: number,
};

export class FlipCard extends Component {
  props: Props;

  state = {
    animatedValue: new Animated.Value(0),
    isFlipped: true,
  };

  componentDidUpdate(prevProps: Props, prevState: *) {
    if (this.state.isFlipped !== prevState.isFlipped) {
      this._flippedCard();
    }
  }

  _flipToggleCard = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

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
      return this.props.renderFront(this._flipToggleCard);
    }
    return this.props.renderBack(this._flipToggleCard);
  }

  render() {
    const perspective = 2000;
    const rotateY = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return (
      <View style={styles.animatedContainer}>
        <Animated.View
          style={[styles.animatedContainer, { transform: [{ rotateY }, { perspective }]}]}
        >
          {this.flippedCardView(this.state.isFlipped)}
        </Animated.View>
      </View>);
  }
}

export default FlipCard;
