import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import StudentUpdate from './StudentUpdate';
import { fetchStudents, fetchCampuses } from '../reducers';
import { connect } from 'react-redux';

class SingleStudent extends Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }


  render() {
    const studentId = this.props.match.params.studentId;
    const students = this.props.students;
    const campuses = this.props.campuses;
    if (students.length && campuses.length) {
      const filteredStudent = students.filter(student => student.id === +studentId);
      const filteredCampus = campuses.filter(campus => campus.id === +filteredStudent[0].campusId);
      if (filteredCampus.length) {
        return (
          <div className="container text-center">
            <h2>Name: {filteredStudent[0].name}</h2>
            <h4>Email: {filteredStudent[0].email}</h4>
            <h4>Campus: <NavLink to={`/Campuses/${filteredCampus[0].id}`}>{filteredCampus[0].name}</NavLink></h4>
            <hr />
            <StudentUpdate student={filteredStudent[0]} />
          </div>
        );
      }
      else {
        return (
          <div className="container text-center">
            <h2>Name: {filteredStudent[0].name}</h2>
            <h4>Email: {filteredStudent[0].email}</h4>
            <h4>Campus: No Campus</h4>
            <StudentUpdate student={filteredStudent[0]} />
          </div>
        );
      }
    }
    else {
      return (<div />);
    }
  }
}
const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  };
};
const mapDispatchToProps = { fetchStudents, fetchCampuses };


export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

