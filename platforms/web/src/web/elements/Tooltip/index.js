// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

const Wrapper = styled.div`
  position: absolute;
  top: 25px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  max-width: ${props => props.width}px;
  max-height: ${props => props.height}px;
  left: -${props => props.width / 2}px;
  z-index: 10;
`;

const Arrow = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  left: 50%;
  filter: drop-shadow(rgba(0, 0, 0, 0.2) 0 -3px 5px);
`;

const Content = styled.div`
  height: 100%;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.71;
  color: ${props => props.theme.colors.secondary};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 16px;
  border-radius: 5px;
  overflow-y: auto;
`;

type Props = {
  children: *,
  width: string,
  height: string,
  isOpen: boolean,
  handleOpen: Function,
};

// require position relative/absolute for parent
class Tooltip extends PureComponent<Props> {
  handleClickOutside(e) {
    e.preventDefault();
    this.props.handleOpen(false);
  }

  render() {
    const { isOpen, width, height, children } = this.props;

    return (
      <Wrapper hidden={!isOpen} width={width} height={height}>
        <Arrow />
        <Content>{children}</Content>
      </Wrapper>
    );
  }
}

export default onClickOutside(Tooltip);
