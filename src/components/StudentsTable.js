import React from 'react';
import students, {
  getAvatarUrl,
  getFullName,
  getGitHubAccountUrl,
  persistAll,
} from '../data/students';
import { sortBy } from 'lodash';
import Switch from '@material-ui/core/Switch';

const StudentsTableRow = ({
  firstName,
  lastName,
  gitHubAccountUrl,
  firstTrainerMeetingDone,
  avatarUrl,
  fullName,
  handleTrainerMeetingDoneToogle = () => {},
}) => {
  return (
    <tr>
      <td>
        <a href={gitHubAccountUrl} target='_blank' rel='noopener noreferrer'>
          <img
            className='avatar'
            src={avatarUrl}
            alt={fullName + "'s Github avatar"}
          />
        </a>
      </td>
      <td>
        <a href={gitHubAccountUrl}>{firstName}</a>
      </td>
      <td>{lastName.toUpperCase()}</td>
      <td>
        <Switch
          checked={firstTrainerMeetingDone}
          onChange={handleTrainerMeetingDoneToogle}
          color='primary'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </td>
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

  handleTrainerMeetingDoneToogle = (githubUserName) => {
    this.setState(
      ({ sortedStudents }) => ({
        sortedStudents: sortedStudents.map((s) =>
          s.githubUserName === githubUserName
            ? {
                ...s,
                firstTrainerMeetingDone: !s.firstTrainerMeetingDone,
              }
            : s
        ),
      }),
      () => {
        persistAll(this.state.sortedStudents);
      }
    );
  };

  render() {
    const { sortedStudents, activeSort } = this.state;
    const { handleTrainerMeetingDoneToogle } = this;

    return (
      <table>
        <thead>
          <tr>
            <td>Avatar</td>
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
        <tbody>
          {sortedStudents.map((student) => {
            const {
              githubUserName,
              firstName,
              lastName,
              firstTrainerMeetingDone,
            } = student;
            return (
              <StudentsTableRow
                key={githubUserName}
                handleTrainerMeetingDoneToogle={() =>
                  handleTrainerMeetingDoneToogle(githubUserName)
                }
                {...{
                  firstTrainerMeetingDone,
                  firstName,
                  lastName,
                  gitHubAccountUrl: getGitHubAccountUrl(student),
                  avatarUrl: getAvatarUrl(student),
                  fullName: getFullName(student),
                }}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default StudentsTable;
