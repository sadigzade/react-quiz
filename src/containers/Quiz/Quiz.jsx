import React, { Component } from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

import classes from './Quiz.module.scss';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо?',
        answers: [
          { id: 1, text: 'Чёрный' },
          { id: 2, text: 'Синий' },
          { id: 3, text: 'Красный' },
          { id: 4, text: 'Зелёный' },
        ],
        rightAnswerId: 2,
      },
      {
        id: 2,
        question: 'В каком году основал Санкт-Петербург?',
        answers: [
          { id: 1, text: '1700' },
          { id: 2, text: '1702' },
          { id: 3, text: '1703' },
          { id: 4, text: '1803' },
        ],
        rightAnswerId: 3,
      },
    ],
  };

  handlerAnswerClick = (answerId) => {
    const quiz = this.state.quiz[this.state.activeQuestion];

    if (answerId === quiz.rightAnswerId) {
      this.setState({ answerState: { [answerId]: 'success' } });

      const timer = window.setTimeout(() => {
        if (this.isFinishedQuiz()) {
          console.log('Finish');
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        window.clearTimeout(timer);
      }, 1000);
    } else {
      this.setState({ answerState: { [answerId]: 'error' } });
    }
  };

  isFinishedQuiz = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответье на все вопросы</h1>

          <ActiveQuiz
            question={this.state.quiz[this.state.activeQuestion].question}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            onAnswerClick={this.handlerAnswerClick}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
