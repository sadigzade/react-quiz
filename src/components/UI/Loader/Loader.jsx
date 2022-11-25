import React from 'react';

import classes from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={classes.center}>
      <div className={classes.Loader}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
