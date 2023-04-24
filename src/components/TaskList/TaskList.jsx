import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todoData, deleteItem, onToggleCompleted, editTask, onSubmitEdit, changeTimerValue }) => {
  return (
    <ul className="todo-list">
      {todoData.map((el) => {
        console.log(todoData);
        return (
          <Task
            id={el.id}
            key={el.id}
            task={el.task}
            completed={el.completed}
            edit={el.edit}
            date={el.date}
            deleteItem={() => deleteItem(el.id)}
            onToggleCompleted={() => onToggleCompleted(el.id)}
            editTask={() => editTask(el.id)}
            onSubmitEdit={(event) => onSubmitEdit(event, el.id)}
            changeTimerValue={(id, value) => changeTimerValue(id, value)}
            timer={el.timer}
          />
        );
      })}
    </ul>
  );
};
TaskList.defaultProps = {
  todoData: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  editTask: () => {},
  onSubmitEdit: () => {},
  changeTimerValue: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  editTask: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  changeTimerValue: PropTypes.func,
};
export default TaskList;

// import React from 'react';
// import PropTypes from 'prop-types';

// import Task from '../Task/Task';
// import './TaskList.css';

// const TaskList = ({ todoData, deleteItem, onToggleCompleted, editTask, onSubmitEdit }) => {
//   return (
//     <ul className="todo-list">
//       {todoData.map((el) => {
//         return (
//           <Task
//             id={el.id}
//             key={el.id}
//             task={el.task}
//             completed={el.completed}
//             edit={el.edit}
//             date={el.date}
//             deleteItem={() => deleteItem(el.id)}
//             onToggleCompleted={() => onToggleCompleted(el.id)}
//             editTask={() => editTask(el.id)}
//             onSubmitEdit={(event) => onSubmitEdit(event, el.id)}
//           />
//         );
//       })}
//     </ul>
//   );
// };
// TaskList.defaultProps = {
//   todoData: [],
//   onDeleted: () => {},
//   onToggleCompleted: () => {},
//   editTask: () => {},
//   onSubmitEdit: () => {},
// };

// TaskList.propTypes = {
//   todoData: PropTypes.arrayOf(PropTypes.object),
//   onDeleted: PropTypes.func,
//   onToggleCompleted: PropTypes.func,
//   editTask: PropTypes.func,
//   onSubmitEdit: PropTypes.func,
// };
// export default TaskList;
