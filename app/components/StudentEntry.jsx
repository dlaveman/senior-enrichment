import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent, fetchStudents, fetchCampuses } from '../reducers';

class StudentEntry extends Component {
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
  handleFormSubmit(evt){
    this.props.handleSubmit(evt);
    this.setState({studentName: '', studentEmail: ''});
  }
  render() {
    const { campusId } = this.props;
    console.log(this.state.student);
    if (campusId !== undefined) {
      return (
        <div>
          <h3 className="text-center"> Add New Student </h3>
          <form id="new-student-form" onSubmit={this.handleFormSubmit} className="row">
            <div className="input-group input-group-lg">
              <div className="col-lg-6">
                <input
                  className="form-control"
                  type="text"
                  name="studentName"
                  value={this.state.studentName}
                  onChange={this.handleNameChange}
                  placeholder="Enter Student Name..."
                /></div>
              <div className="col-lg-6">
                <input
                  className="form-control"
                  type="text"
                  name="studentEmail"
                  value={this.state.studentEmail}
                  onChange={this.handleEmailChange}
                  placeholder="Enter Student Email..."
                /></div>
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">Enter</button>
              </span>
            </div>
          </form>
        </div>);
    }
    else {
      return (
        <div>
          <h3 className="text-center">Add New Student</h3>
          <form id="new-student-form" onSubmit={this.handleFormSubmit} className="row" >
            <div className="input-group input-group-lg">
              <div className="col-lg-4">
                <input
                  className="form-control"
                  type="text"
                  name="studentName"
                  value={this.state.studentName}
                  onChange={this.handleNameChange}
                  placeholder="Enter Student Name..."
                />
              </div>
              <div className="col-lg-4">
                <input
                  className="form-control"
                  type="text"
                  name="studentEmail"
                  value={this.state.studentEmail}
                  onChange={this.handleEmailChange}
                  placeholder="Enter Student Email..."
                />
              </div>
              <div className="col-lg-4">
                <select name="campus">
                  {this.props.campuses.map(campus => {
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    );
                  })}
                </select>
              </div>
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">Enter</button>
              </span>
            </div>
          </form>
        </div>);

    }
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
  console.log(ownProps);
  return {
    fetchCampuses: () => {
      dispatch(fetchCampuses());
    },
    fetchStudents: () => {
      dispatch(fetchStudents());
    },
    handleChange(evt) {
      this.setState(this.state.student = evt.target.value);
    },
    handleSubmit(evt) {
      evt.preventDefault();
      let cId;
      if (evt.target.campus === undefined) {
        cId = ownProps.campusId;
      }
      else {
        cId = evt.target.campus.value;
      }
      dispatch(postStudent({ name: evt.target.studentName.value, email: evt.target.studentEmail.value, campusId: cId }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentEntry);
