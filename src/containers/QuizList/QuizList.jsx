import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import classes from './QuizList.module.scss';

class QuizList extends Component {
  state = {
    quizes: [],
  };

  renderQuizes = () => {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  async componentDidMount() {
    const response = await axios.get(
      'https://react-quiz-e615d-default-rtdb.firebaseio.com/quizes.json',
    );

    const quizes = [];

    Object.keys(response.data).forEach((key, index) => {
      quizes.push({
        id: key,
        name: `Тест №${index + 1}`,
      });
    });

    this.setState({ quizes });
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
