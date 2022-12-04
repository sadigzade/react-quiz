import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import { fetchQuizById, handleRetry, quizAnswerClick } from '../../store/actions/quiz';

import classes from './Quiz.module.scss';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.handleRetry();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответье на все вопросы</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.handleRetry}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              props={this.props.answerprops}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeQuestion: state.quiz.activeQuestion,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    handleRetry: () => dispatch(handleRetry()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Quiz));
