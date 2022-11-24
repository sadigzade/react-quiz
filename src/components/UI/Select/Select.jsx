import React from 'react';

import classes from './Select.module.scss';

const Select = (props) => {
  const htmlFor = `${props.label}--${props.label}`;

  return (
    <div className={classes.Select}>
      <div>
        <label htmlFor={htmlFor}>{props.label}</label>
        <select id={htmlFor} value={props.value} onChange={props.onChange}>
          {props.options.map((option, index) => (
            <option key={option.value + index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
