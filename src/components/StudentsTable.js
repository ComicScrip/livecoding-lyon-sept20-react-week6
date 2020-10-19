import React from 'react';
import students from '../data/students';
import { sortBy } from 'lodash';

const StudentsTableRow = ({
  firstName,
  lastName,
  githubUserName,
  firstTrainerMeetingDone,
}) => {
  // const studentDetailsPageLink = '/students/' + githubUserName;
  return (
    <tr key={githubUserName}>
      <td>{firstName}</td>
      <td>{lastName.toUpperCase()}</td>
      <td>{firstTrainerMeetingDone ? 'oui' : 'non'}</td>
    </tr>
  );
};

const SortButton = ({ fieldToSortBy, sortOrder, activeSort, onClick }) => {
  const fieldToSortByWithOrder = fieldToSortBy + ' ' + sortOrder;
  return (
    <span
      className={
        'sort-button' + (activeSort === fieldToSortByWithOrder ? ' active' : '')
      }
      onClick={() => {
        onClick(fieldToSortByWithOrder);
      }}
    >
      <i className={'fas fa-arrow-' + (sortOrder === 'DESC' ? 'up' : 'down')} />
    </span>
  );
};

class StudentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSort: null,
      sortedStudents: students,
    };
    this.handleSortButtonClicked = this.handleSortButtonClicked.bind(this);
  }

  handleSortButtonClicked(fieldToSortByWithOrder) {
    if (this.state.activeSort === fieldToSortByWithOrder) {
      this.setState({ sortedStudents: students, activeSort: null });
    } else {
      const [fieldToSortBy, sortOrder] = fieldToSortByWithOrder.split(' ');
      let sortedStudents = sortBy(students, fieldToSortBy);
      if (sortOrder === 'DESC') {
        sortedStudents = sortedStudents.reverse();
      }
      this.setState({ sortedStudents, activeSort: fieldToSortByWithOrder });
    }
  }

  render() {
    const { sortedStudents, activeSort } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <td>
              Prénom
              <span className='col-sort-buttons-container'>
                <SortButton
                  fieldToSortBy='firstName'
                  sortOrder='ASC'
                  onClick={this.handleSortButtonClicked}
                  activeSort={activeSort}
                />
                <SortButton
                  fieldToSortBy='firstName'
                  sortOrder='DESC'
                  onClick={this.handleSortButtonClicked}
                  activeSort={activeSort}
                />
              </span>
            </td>
            <td>
              Nom
              <span className='col-sort-buttons-container'>
                <SortButton
                  fieldToSortBy='lastName'
                  sortOrder='ASC'
                  onClick={this.handleSortButtonClicked}
                  activeSort={activeSort}
                />
                <SortButton
                  fieldToSortBy='lastName'
                  sortOrder='DESC'
                  onClick={this.handleSortButtonClicked}
                  activeSort={activeSort}
                />
              </span>
            </td>
            <td>Entretien tech passé</td>
          </tr>
        </thead>
        <tbody>{sortedStudents.map(StudentsTableRow)}</tbody>
      </table>
    );
  }
}

export default StudentsTable;
