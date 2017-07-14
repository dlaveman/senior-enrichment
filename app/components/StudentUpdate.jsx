import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putStudent, writeStudent, fetchStudents, fetchCampuses } from '../reducers';

class StudentUpdate extends Component {
  constructor() {
    super();
    this.state = {
      studentName: '',
      studentEmail: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }
  handleNameChange(evt) {
    this.setState({ studentName: evt.target.value });
  }
  handleEmailChange(evt) {
    this.setState({ studentEmail: evt.target.value });
  }
  handleFormSubmit(evt) {
    this.props.handleSubmit(evt);
    this.setState({ studentName: '', studentEmail: '' });
  }
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }
  render() {
    return (
      <form id="new-student-form" onSubmit={this.handleFormSubmit} className="row">
        <h3>Edit Student Info</h3>
        <div className="input-group input-group-lg">
          <div className="col-lg-4">
            <input
              className="form-control"
              type="text"
              name="studentName"
              value={this.state.studentName}
              onChange={this.handleNameChange}
              placeholder="Edit Student Name..."
            />
          </div>
          <div className="col-lg-4">
            <input
              className="form-control"
              type="text"
              name="studentEmail"
              value={this.state.studentEmail}
              onChange={this.handleEmailChange}
              placeholder="Edit Student Email..."
            />
          </div>
          <div className="col-lg-4">
            <select name="campus" defaultValue="Change Campus">
              <option>Change Campus</option>
              {this.props.campuses.map(campus => {
                return (
                  <option key={campus.id} value={campus.id}>{campus.name}</option>
                );
              })}
            </select>
          </div>
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Edit</button>
          </span>
        </div>
      </form>);

  }
}

const mapStateToProps = function (state) {
  return {
    student: state.student,
    ownProps: state.ownProps,
    campuses: state.campuses
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    fetchCampuses: () => {
      dispatch(fetchCampuses());
    },
    fetchStudents: () => {
      dispatch(fetchStudents());
    },
    handleChange(evt) {
      dispatch(writeStudent(evt.target.value));
    },
    handleSubmit(evt) {
      evt.preventDefault();
      console.log(ownProps);
      let name, email, cId;
      evt.target.studentName.value === '' ? name = ownProps.student.name : name = evt.target.studentName.value;
      evt.target.studentEmail.value === '' ? email = ownProps.student.email : email = evt.target.studentEmail.value;
      evt.target.campus.value === 'Change Campus' ? cId = ownProps.student.campusId : cId = evt.target.campus.value;

      dispatch(putStudent(ownProps.student.id, { name: name, email: email, campusId: cId }));
      dispatch(writeStudent(''));
      // ownProps.history.push(`/student/${ownProps.student.id}`);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentUpdate);
