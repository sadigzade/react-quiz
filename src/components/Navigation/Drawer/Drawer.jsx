import React, { Component, Fragment } from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.scss';

const links = [1, 2, 3];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => (
      <li key={index}>
        <a href="#">Link {link}</a>
      </li>
    ));
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <Fragment>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
      </Fragment>
    );
  }
}

export default Drawer;
