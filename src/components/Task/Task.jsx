import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';
export default class Task extends React.Component {
  state = {
    dataText: null,
    value: this.props.task,
  };
  a = 5;
  componentDidMount() {
    this.setStateDataText();
    this.timer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  static defaultProps = {
    id: 1,
    task: '',
    completed: false,
    date: new Date(),
    deleteItem: () => {},
    onToggleCompleted: () => {},
    editTask: () => {},
    edit: false,
    onSubmitEdit: () => {},
  };
  static propTypes = {
    id: PropTypes.number,
    task: PropTypes.string,
    completed: PropTypes.bool,
    date: PropTypes.object,
    deleteItem: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    editTask: PropTypes.func,
    edit: PropTypes.bool,
    onSubmitEdit: PropTypes.func,
  };
  setStateDataText = () => {
    this.setState({
      dataText: formatDistanceToNow(this.props.date, { includeSeconds: true }),
    });
  };
  timer = () => {
    this.interval = setInterval(() => {
      this.setStateDataText();
    }, 1000);
  };
  setTaskValue = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    const { id, task, completed, deleteItem, onToggleCompleted, edit, editTask, onSubmitEdit } = this.props;

    return edit ? (
      <li className="editing">
        <form onSubmit={onSubmitEdit}>
          <input className="edit" type="text" value={this.state.value} onChange={this.setTaskValue} autoFocus />
        </form>
      </li>
    ) : (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
          <label htmlFor={id}>
            <span className="description">{task}</span>
            <span className="created">{this.state.dataText}</span>
          </label>
          <button className="icon icon-edit" onClick={editTask}></button>
          <button className="icon icon-destroy" onClick={deleteItem}></button>
        </div>
      </li>
    );
  }
}
Task.defaultProps = {};
