// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

type Props = {
  active: boolean,
};

class Loader extends PureComponent<Props> {
  render() {
    const Wrapper = styled.div`
      position: absolute;
      z-index: 10,
      top: 50%;
      left: 50%;
      display: ${this.props.active ? 'fixed' : 'none'};
      width: 100%;
      height: 100%;
    `;
    return (
      <Wrapper>
        <h1 style={{ color: 'red' }}>Loading</h1>
      </Wrapper>
    );
  }
}

export default Loader;
