// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

type Props = {
  active: boolean,
};

class Loader extends PureComponent<Props> {
  render() {
    const Wrapper = styled.div`
      position: absolute;
      z-index: 10;
      display: ${this.props.active ? 'fixed' : 'none'};
      width: 100%;
      height: 100%;
    `;
    return (
      <Wrapper>
        <RingLoader color="#123abc" loading={this.props.active} />
      </Wrapper>
    );
  }
}

export default Loader;
