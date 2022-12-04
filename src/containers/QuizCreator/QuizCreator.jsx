import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';

import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create';

import { createControl, validate, validateForm } from '../../form/formFramework';

import classes from './QuizCreator.module.scss';

function createOptionControl(index) {
  return createControl(
    {
      id: index,
      label: `Вариант ${index}`,
      errorMessage: 'Значение не может быть пустым',
    },
    {
      required: true,
    },
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      {
        required: true,
      },
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  handlerAddQuestion = (event) => {
    event.preventDefault();

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      id: this.props.quiz.length + 1,
      question: question.value,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { id: option1.id, text: option1.value },
        { id: option2.id, text: option2.value },
        { id: option3.id, text: option3.value },
        { id: option4.id, text: option4.value },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  handlerCreateQuiz = (event) => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });

    this.props.finishCreateQuiz();
  };

  handlerChange = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      isFormValid: validateForm(formControls),
      formControls,
    });
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            key={index}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) => this.handlerChange(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };

  handlerSelectChange = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.handlerSelectChange}
        options={[
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 },
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.onSubmitHandler}>
            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.handlerAddQuestion}
              disabled={!this.state.isFormValid}>
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.handlerCreateQuiz}
              disabled={this.props.quiz.length === 0}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
