/* eslint-disable indent */
import React from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

import './App.css';

export default class App extends React.Component {
  maxId = 1;
  state = {
    todoData: [],
    filter: 'All',
  };

  addItem = (text) => {
    const newItem = {
      id: this.maxId++,
      task: text,
      completed: false,
      date: new Date(),
      edit: false,
    };

    this.setState(({ todoData }) => {
      const newData = [...todoData, newItem];
      return {
        todoData: newData,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => item.id !== id);
      return {
        todoData: newArray,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  filterTask = () => {
    const { todoData, filter } = this.state;

    if (filter === 'All') return todoData;
    return todoData.filter((item) => (filter === 'Completed' ? item.completed : !item.completed));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newData = todoData.filter((item) => !item.completed);
      return {
        todoData: newData,
      };
    });
  };

  editTask = (id) => {
    const { todoData } = this.state;
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, edit: !oldItem.edit };
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    this.setState(() => {
      return {
        todoData: newArray,
      };
    });
  };

  onSubmitEdit = (event, id) => {
    event.preventDefault();
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((data) => data.id === id);
      const oldData = todoData[index];
      const newData = {
        ...oldData,
        edit: !oldData.edit,

        task: event.target[0].value,
      };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  render() {
    const completedCount = this.state.todoData.filter((el) => !el.completed).length;
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todoData={this.filterTask()}
            deleteItem={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            editTask={this.editTask}
            onSubmitEdit={this.onSubmitEdit}
          />

          <Footer
            completedCount={completedCount}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
