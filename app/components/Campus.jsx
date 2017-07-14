import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchCampuses, deleteCampus} from '../reducers';

class Campus extends Component{
  componentDidMount(){
    this.props.fetchCampuses();
  }
render(){
    const {campus, handleClick} = this.props;
    return (
      <div>
        <NavLink to={`/campuses/${campus.id}`}>{campus.name}  </NavLink>
        <button className="btn btn-danger remove" type="submit" value={campus.id} onClick={handleClick}>x</button>
      </div>
    );
  }
}
const mapStateToProps = function (state) {
  return {
    campuses: state.campuses,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    fetchCampuses: () => {
      dispatch(fetchCampuses());
    },
    handleClick(evt) {
      evt.preventDefault();
      dispatch(deleteCampus(+evt.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campus);

