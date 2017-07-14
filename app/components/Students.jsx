import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentEntry from './StudentEntry';
import Student from './Student';
import { fetchStudents } from '../reducers';
class Students extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Students</h1>
        <hr />
        <div className="row list-group">
        {
          this.props.students.map(student => (
            <div className="col-md-3 list-group-item" key={student.id}>
              <h3 className="text-center">
                <Student student={student} onCampus="false" />
              </h3>
            </div>))
        }
        </div>
        <hr />
        <StudentEntry />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    students: state.students
  };
};
const mapDispatchToProps = function (dispatch) {
  return {
    fetchStudents: () => {
      dispatch(fetchStudents());
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Students));
