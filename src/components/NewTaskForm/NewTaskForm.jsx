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
  };

  onLabelChange = (e) => {
    this.setState({ task: e.target.value.trim() });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.task.length !== 0) {
      this.props.addItem(this.state.task);
      this.setState({ task: '' });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            onChange={this.onLabelChange}
            value={this.state.task}
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </form>
      </header>
    );
  }
}
