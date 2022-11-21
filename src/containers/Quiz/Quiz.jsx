import React, { Component } from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'Какого цвета небо?',
        answers: [
          { id: 1, text: 'Чёрный' },
          { id: 2, text: 'Синий' },
          { id: 3, text: 'Красный' },
          { id: 4, text: 'Зелёный' },
        ],
        rightAnswerId: 2,
      },
    ],
  };

  handlerAnswerClick = (answerId) => {
    console.log('Answer Id:', answerId);
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответье на все вопросы</h1>

          <ActiveQuiz
            question={this.state.quiz[0].question}
            answers={this.state.quiz[0].answers}
            onAnswerClick={this.handlerAnswerClick}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
