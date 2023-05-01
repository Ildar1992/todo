import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    addItem: () => {},
  };
  static propTypes = {
    addItem: PropTypes.func,
  };

  state = {
    task: '',
    min: '',
    sec: '',
  };

  onSubmitForm = (e) => {
    const { task, min, sec } = this.state;
    e.preventDefault();
    const timerSec = parseInt(min || 0) * 60 + parseInt(sec || 0) * 1;
    if (!this.state.task.trim().length) return;
    if (this.state.task.length !== 0) {
      this.props.addItem(task, timerSec);
      this.setState({
        task: '',
        min: '',
        sec: '',
      });
    }
  };
  onLabelChange = (e) => {
    this.setState({ task: e.target.value });
  };
  onChangeInputMin = (e) => {
    let value = e.target.value;
    if (value != '') e.target.value = this.clamp(+value, 0, 1440) || 0;
    this.setState({
      min: e.target.value,
    });
  };
  onChangeInputSec = (e) => {
    let value = e.target.value;
    if (value != '') e.target.value = this.clamp(+value, 0, 60) || 0;
    this.setState({
      sec: e.target.value,
    });
  };
  clamp = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmitForm} className="new-todo-form">
          <input
            className="new-todo"
            type="text"
            onChange={this.onLabelChange}
            value={this.state.task}
            placeholder="Task"
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Min"
            onChange={this.onChangeInputMin}
            value={this.state.min}
            pattern="[0-9]{\,\2}"
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            onChange={this.onChangeInputSec}
            value={this.state.sec}
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </header>
    );
  }
}
