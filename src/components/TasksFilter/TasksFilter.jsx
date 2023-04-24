import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export default class TasksFilter extends React.Component {
  static defaultProps = {
    onFilterChange: () => {},
  };
  static propTypes = {
    onFilterChange: PropTypes.func,
  };
  maxId = 100;
  state = {
    filter: 'All',
  };
  buttons = [
    { name: 'All', task: 'All' },
    { name: 'Active', task: 'Active' },
    { name: 'Completed', task: 'Completed' },
  ];
  render() {
    const { onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, task }) => {
      return (
        <li key={this.maxId++}>
          <button
            className={this.state.filter === name ? 'selected' : ''}
            onClick={() => {
              onFilterChange(name);
              this.setState({ filter: name });
            }}
          >
            {task}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}

// import React from 'react';
// import PropTypes from 'prop-types';

// import './TasksFilter.css';

// export default class TasksFilter extends React.Component {
//   static defaultProps = {
//     onFilterChange: () => {},
//   };
//   static propTypes = {
//     onFilterChange: PropTypes.func,
//   };
//   maxId = 100;
//   state = {
//     filter: 'All',
//   };
//   buttons = [
//     { name: 'All', task: 'All' },
//     { name: 'Active', task: 'Active' },
//     { name: 'Completed', task: 'Completed' },
//   ];
//   render() {
//     const { onFilterChange } = this.props;
//     const buttons = this.buttons.map(({ name, task }) => {
//       return (
//         <li key={this.maxId++}>
//           <button
//             className={this.state.filter === name ? 'selected' : ''}
//             onClick={() => {
//               onFilterChange(name);
//               this.setState({ filter: name });
//             }}
//           >
//             {task}
//           </button>
//         </li>
//       );
//     });
//     return <ul className="filters">{buttons}</ul>;
//   }
// }
