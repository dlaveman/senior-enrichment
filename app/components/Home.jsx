import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const Home = (props) => {
    return (
      <div className="links">
        <h1>
          <Link to="/campuses">Campuses</Link>
        </h1>
        <h1>
          <Link to="/students">Students</Link>
        </h1>
      </div>
    );
};
export default Home;
