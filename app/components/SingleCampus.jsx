import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Student from './Student';
import StudentEntry from './StudentEntry';
import CampusUpdate from './CampusUpdate';
import { fetchStudents, fetchCampuses } from '../reducers';
import {connect} from 'react-redux';

class SingleCampus extends Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }


  render() {
    const campusId = this.props.match.params.campusId;
    const campuses = this.props.campuses;
    const students = this.props.students;
    if (campuses.length){
      const filteredCampus = campuses.filter(campus => campus.id === +campusId);
      const filteredStudents = students.filter(student => student.campusId === +campusId);
    // const campusId = this.props.match.params.campusId;
    return (
      <div className="container text-center">
        <h1>{filteredCampus[0].name}</h1>
        <CampusUpdate campus={filteredCampus[0]} />
        <hr />
          <img src={filteredCampus[0].image} height="600" width="750" />
          <hr />
          <h2>Students</h2>
           <div className="row list-group">
        {
          filteredStudents.map(student => (
            <div className="col-md-3 list-group-item" key={student.id}>
              <h3 className="text-center">
                <Student student={student} onCampus="true" />
              </h3>
            </div>))
        }
        </div>
        <hr />
          <StudentEntry campusId={campusId} />
      </div>
    );
  }
  else {
  return (<div />);
  }
  }
}
const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students
  };
};
const mapDispatchToProps = {fetchCampuses, fetchStudents};


export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

