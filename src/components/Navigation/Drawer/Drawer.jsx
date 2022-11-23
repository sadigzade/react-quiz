import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.scss';

const links = [
  { to: '/', label: 'Список' },
  { to: '/auth', label: 'Авторизация' },
  { to: '/quiz-creator', label: 'Создать тест' },
];

class Drawer extends Component {
  handleClick = () => {
    this.props.onClose();
  };

  renderLinks() {
    const activeStyle = {
      opacity: 0.7,
    };

    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          className={classes.active}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          onClick={this.handleClick}>
          {link.label}
        </NavLink>
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
