import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import classes from './QuizList.module.scss';

class QuizList extends Component {
  renderQuizes = () => {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={`/quiz/${quiz}`}>Тест {quiz}</NavLink>
        </li>
      );
    });
  };

  componentDidMount() {
    axios
      .get('https://react-quiz-e615d-default-rtdb.firebaseio.com/quiz.json')
      .then((res) => console.log(res));
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
