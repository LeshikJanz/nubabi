// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

type Props = {
  active: boolean,
};

class Header extends PureComponent<Props> {
  render() {
    const Wrapper = styled.div`
      position: absolute;
      display: ${this.props.active ? 'fixed' : 'none'};
      width: 100%;
      height: 100%;
    `;
    return (
      <Wrapper>
        <div>Loading</div>
      </Wrapper>
    );
  }
}

export default Header;
