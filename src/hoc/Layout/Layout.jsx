import React, { Component } from 'react';

import Drawer from '../../components/Navigation/Drawer/Drawer';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';

import classes from './Layout.module.scss';

class Layout extends Component {
  state = {
    menu: false,
  };

  handlerToggleMenu = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  handlerMenuClose = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.handlerMenuClose} />
        <MenuToggle onToggle={this.handlerToggleMenu} isOpen={this.state.menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
