import React, { Component } from 'react';
import axios from '../../axios/axios-qioz';
import { useParams } from 'react-router-dom';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import classes from './Quiz.module.scss';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    isFinished: false,
    results: {},
    answerState: null,
    quiz: [],
    loading: true,
  };

  handleAnswerClick = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (answerId === question.rightAnswerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      });

      const timer = window.setTimeout(() => {
        if (this.isFinishedQuiz()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        window.clearTimeout(timer);
      }, 1000);
    } else {
      results[question.id] = 'error';

      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      });
    }
  };

  isFinishedQuiz = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  handleRetry = () => {
    this.setState({
      activeQuestion: 0,
      isFinished: false,
      results: {},
      answerState: null,
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.params.id}.json`);
      const quiz = response.data;

      this.setState({ quiz, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответье на все вопросы</h1>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.handleRetry}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.handleAnswerClick}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withParams(Quiz);
