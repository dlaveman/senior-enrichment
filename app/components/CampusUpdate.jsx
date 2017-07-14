import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putCampus, writeCampus, fetchStudents, fetchCampuses } from '../reducers';

class CampusUpdate extends Component {
  constructor() {
    super();
    this.state = {
      campusName: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleNameChange(evt) {
    this.setState({ campusName: evt.target.value });
  }
  handleFormSubmit(evt){
    this.props.handleSubmit(evt);
    this.setState({campusName: ''});
  }
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }
  render() {
    return (
      <form id="new-campus-form" onSubmit={this.handleFormSubmit}>
        <div className="input-group input-group-md">
          <input
            className="form-control"
            type="text"
            name="campusName"
            value={this.state.campusName}
            onChange={this.handleNameChange}
            placeholder="Edit Campus Name..."
          />
          {/*<select name="campus">
            <option selected="true">Change Campus Image</option>
            {this.props.campuses.map(campus => {
              return (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              );
            })}
          </select>*/}
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Edit</button>
          </span>
        </div>
      </form>);

  }
}

const mapStateToProps = function (state) {
  return {
    students: state.students,
    ownProps: state.ownProps,
    campus: state.campus
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
      dispatch(writeCampus(evt.target.value));
    },
    handleSubmit(evt) {
      evt.preventDefault();
      console.log(ownProps);
      let name;
      // , email, cId;
      evt.target.campusName.value === '' ? name = ownProps.campus.name : name = evt.target.campusName.value;
      // evt.target.campus.value === 'Change Campus' ? cId = ownProps.student.campusId : cId = evt.target.campus.value;

      dispatch(putCampus(ownProps.campus.id, { name: name}));
      // ownProps.history.push(`/student/${ownProps.student.id}`);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampusUpdate);
