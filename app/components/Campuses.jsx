import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampusEntry from './CampusEntry';
import Campus from './Campus';
import { fetchCampuses } from '../reducers';
class Campuses extends Component {
  componentDidMount() {
    this.props.fetchCampuses();
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Campuses</h1>
        <hr />
        <div className="row list-group">
          {
            this.props.campuses.map(campus => {
              return (
                <div className="col-lg-4" key={campus.id}>
                  <h4>
                    <img className="thumbnail" src={campus.image} alt="image" height="400" width="400" />
                    <div className="text-center">
                    <Campus campus={campus} />
                    </div>
                  </h4>
                </div>
              );
            }
            )
          }
        </div>
        <hr />
        <CampusEntry />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampuses: () => {
      dispatch(fetchCampuses());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
