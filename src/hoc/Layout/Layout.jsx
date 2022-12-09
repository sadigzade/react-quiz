import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from '../../components/Navigation/Drawer/Drawer';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';

import classes from './Layout.module.scss';

class Layout extends Component {
  state = {
    menu: false,
  };

  handleToggleMenu = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  handleMenuClose = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.handleMenuClose}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle onToggle={this.handleToggleMenu} isOpen={this.state.menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
