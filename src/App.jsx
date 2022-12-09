import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Logout from './containers/Logout/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz-creator" element={<QuizCreator />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/" element={<QuizList />} />
      </Routes>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="/quiz-creator" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<QuizList />} />
          <Route path="/auth" element={<Navigate to="/" replace={true} />} />
        </Routes>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
