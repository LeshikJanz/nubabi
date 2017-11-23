// @flow
import type { Element } from 'react';
import React, { PureComponent } from 'react';
import MenuItem from './MenuItem';
import Link from './Link';

type Props = {
  children: Element<*>,
};

class Menu extends PureComponent<Props> {
  static Item = MenuItem;
  static Link = Link;
  render() {
    const { children, ...rest } = this.props;
    return <div {...rest}>{children}</div>;
  }
}

export default Menu;
