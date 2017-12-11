// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

type Props = {
  active: boolean,
};

class GlobalLoader extends PureComponent<Props> {
  render() {
    const Wrapper = styled.div`
      display: flex;
      position: absolute;
      z-index: 10;
      background: rgba(0, 0, 0, 0.1);
      display: ${this.props.active ? 'fixed' : 'none'};
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    `;
    return (
      <Wrapper>
        <RingLoader color="#123abc" loading={this.props.active} />
      </Wrapper>
    );
  }
}

export default GlobalLoader;
