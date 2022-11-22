import React, { Component } from 'react';

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

  render() {
    return (
      <div className={classes.Layout}>
        <MenuToggle onToggle={this.handlerToggleMenu} isOpen={this.state.menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
