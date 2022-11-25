import React, { Component } from 'react';
import axios from '../../axios/axios-qioz';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';

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
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  handleAddQuestion = (event) => {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      id: index,
      question: question.value,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { id: option1.id, text: option1.value },
        { id: option2.id, text: option2.value },
        { id: option3.id, text: option3.value },
        { id: option4.id, text: option4.value },
      ],
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  handleCreateQuiz = async () => {
    try {
      await axios.post('/quizes.json', this.state.quiz);

      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (value, controlName) => {
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
            onChange={(event) => this.handleChange(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };

  handelSelectChange = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.handelSelectChange}
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
              onClick={this.handleAddQuestion}
              disabled={!this.state.isFormValid}>
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.handleCreateQuiz}
              disabled={this.state.quiz.length === 0}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
