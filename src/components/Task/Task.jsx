import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';
export default class Task extends React.Component {
  static defaultProps = {
    id: 1,
    task: '',
    completed: false,
    edit: false,
    onToggleCompleted: () => {},
    onSubmitEdit: () => {},
    deleteItem: () => {},
    editTask: () => {},
    date: new Date(),
    timer: 0,
  };
  static propTypes = {
    id: PropTypes.number,
    task: PropTypes.string,
    completed: PropTypes.bool,
    onToggleCompleted: PropTypes.func,
    onSubmitEdit: PropTypes.func,
    deleteItem: PropTypes.func,
    editTask: PropTypes.func,
    edit: PropTypes.bool,
    date: PropTypes.object,
    timer: PropTypes.number,
  };
  state = {
    dataText: null,
    value: this.props.task,
    timer: this.props.timer,
    pause: true,
  };
  setStateDataText = () => {
    this.setState({
      dataText: formatDistanceToNow(this.props.date, { includeSeconds: true }),
    });
  };

  timer = () => {
    this.interval = setInterval(() => {
      this.setStateDataText();
      this.timerRun();
    }, 1000);
  };
  timerRun = () => {
    const { pause, timer } = this.state;

    if (!pause) this.setState({ timer: timer - 1 });
  };

  componentDidMount() {
    this.setStateDataText();
    this.timer();
  }
  componentWillUnmount() {
    const { id, changeTimerValue } = this.props;

    clearInterval(this.interval);
    changeTimerValue(id, this.state.timer);
  }

  setTaskValue = (event) => {
    this.setState({ value: event.target.value });
  };
  timerSet = () => {
    const { timer } = this.state;

    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  onPlay = () => {
    this.setState({ pause: false });
  };

  onPause = () => {
    this.setState({ pause: true });
  };
  render() {
    const { id, task, completed, deleteItem, onToggleCompleted, edit, editTask, onSubmitEdit } = this.props;

    return edit ? (
      <li className="editing">
        <form onSubmit={onSubmitEdit}>
          <input className="edit" type="text" defaultValue={this.state.value} onChange={this.setTaskValue} autoFocus />
        </form>
      </li>
    ) : (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
          <label htmlFor={id}>
            <span className="title">{task}</span>
            <div className="description">
              <button className="icon icon-play" onClick={this.onPlay}></button>
              <button className="icon icon-pause" onClick={this.onPause}></button>
              <span className="timer">{this.timerSet()}</span>
            </div>
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

// import React from 'react';
// import PropTypes from 'prop-types';
// import { formatDistanceToNow } from 'date-fns';
// import './Task.css';
// export default class Task extends React.Component {
//   state = {
//     dataText: null,
//     value: this.props.task,
//   };
//   componentDidMount() {
//     this.setStateDataText();
//     this.timer();
//   }
//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }
//   static defaultProps = {
//     id: 1,
//     task: '',
//     completed: false,
//     date: new Date(),
//     deleteItem: () => {},
//     onToggleCompleted: () => {},
//     editTask: () => {},
//     edit: false,
//     onSubmitEdit: () => {},
//   };
//   static propTypes = {
//     id: PropTypes.number,
//     task: PropTypes.string,
//     completed: PropTypes.bool,
//     date: PropTypes.object,
//     deleteItem: PropTypes.func,
//     onToggleCompleted: PropTypes.func,
//     editTask: PropTypes.func,
//     edit: PropTypes.bool,
//     onSubmitEdit: PropTypes.func,
//   };
//   setStateDataText = () => {
//     this.setState({
//       dataText: formatDistanceToNow(this.props.date, { includeSeconds: true }),
//     });
//   };
//   timer = () => {
//     this.interval = setInterval(() => {
//       this.setStateDataText();
//     }, 1000);
//   };
//   setTaskValue = (event) => {
//     this.setState({ value: event.target.value });
//   };
//   render() {
//     const { id, task, completed, deleteItem, onToggleCompleted, edit, editTask, onSubmitEdit } = this.props;

//     return edit ? (
//       <li className="editing">
//         <form onSubmit={onSubmitEdit}>
//           <input className="edit" type="text" value={this.state.value} onChange={this.setTaskValue} autoFocus />
//         </form>
//       </li>
//     ) : (
//       <li className={completed ? 'completed' : ''}>
//         <div className="view">
//           <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
//           <label htmlFor={id}>
//             <span className="description">{task}</span>
//             <span className="created">{this.state.dataText}</span>
//           </label>
//           <button className="icon icon-edit" onClick={editTask}></button>
//           <button className="icon icon-destroy" onClick={deleteItem}></button>
//         </div>
//       </li>
//     );
//   }
// }
// Task.defaultProps = {};
