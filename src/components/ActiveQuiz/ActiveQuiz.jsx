import React from 'react';

import AnswersList from './AnswersList/AnswersList';

import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>1.</strong>&nbsp;{props.question}
        </span>
        <small>1 из 12</small>
      </p>

      <AnswersList answers={props.answers} onAnswerClick={props.onAnswerClick} />
    </div>
  );
};

export default ActiveQuiz;
