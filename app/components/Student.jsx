import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudents, deleteStudent, putStudent } from '../reducers';

class Student extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }
  render() {
    const { student, handleClick } = this.props;
    return (
      <div>
        <NavLink to={`/students/${student.id}`}>{student.name}  </NavLink>
        <button className="btn btn-danger remove" type="submit" value={student.id} onClick={handleClick}>x</button>
      </div>
    );
  }
}
const mapStateToProps = function (state) {
  return {
    students: state.students,
    ownProps: state.ownProps
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchStudents: () => {
      dispatch(fetchStudents());
    },
    handleClick(evt) {
      evt.preventDefault();
      console.log(ownProps);
      if (ownProps.onCampus === 'true') {
        dispatch(putStudent(ownProps.student.id, { name: ownProps.student.name, email: ownProps.student.email, campusId: null }));
      }
      else {
        dispatch(deleteStudent(+evt.target.value));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);

