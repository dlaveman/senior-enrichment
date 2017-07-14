import React, {Component} from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../reducers';

class CampusEntry extends Component{
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
  render(){
  return (
    <div>
      <h3 className="text-center">Add New Campus</h3>
      <form id="new-campus-form" onSubmit={this.handleFormSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="campusName"
            value={this.state.campusName}
            onChange={this.handleNameChange}
            placeholder="Enter Campus Name..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Enter</button>
          </span>
        </div>
      </form>
    </div>
  );
}
}

const mapStateToProps = function (state) {
  return {
    campus: state.campus
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      dispatch(postCampus({ name: evt.target.campusName.value }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampusEntry);
