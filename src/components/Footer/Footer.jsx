import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

import './Footer.css';

const Footer = ({ completedCount, onFilterChange, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left </span>
      <TasksFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
Footer.defaultProps = {
  completedCount: 0,
  onFilterChange: () => {},
  clearCompleted: () => {},
};
Footer.propTypes = {
  completedCount: PropTypes.number,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
