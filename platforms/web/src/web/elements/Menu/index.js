// @flow
import React, { PureComponent } from "react";
import MenuItem from "./MenuItem";
import Link from "./Link";

class Menu extends PureComponent {
  static Item = MenuItem;
  static Link = Link;
  render() {
    const { children, ...rest } = this.props;
    return (
      <div {...rest}>
        {children}
      </div>
    );
  }
}

export default Menu;
