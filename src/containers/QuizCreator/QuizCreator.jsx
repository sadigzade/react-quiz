import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';

import classes from './QuizCreator.module.scss';

class QuizCreator extends Component {
  onSubmitHandler = (e) => {
    e.preventDefault();
  };

  handleAddQuestion = () => {};

  handleCreateQuiz = () => {};

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.onSubmitHandler}>
            <input type="text" />
            <hr />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />

            <select></select>
            <Button type="primary" onClick={this.handleAddQuestion}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.handleCreateQuiz}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
