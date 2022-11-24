import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';

import { createControl } from '../../form/formFramework';

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
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
  };

  handleAddQuestion = () => {};

  handleCreateQuiz = () => {};

  handleChange = (value, controlName) => {};

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
