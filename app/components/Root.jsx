import React from 'react';
import { NavLink } from 'react-router-dom';
const Root = () => {
  return (
    <nav className="navbar navbar-default nav nav-justified nav-pills">
      <h1 className="text-center navHead">Margaret Hamilton Interplanetary Academy of JavaScript</h1>
      {location.href.substr(24, 33) === 'campuses' || location.href.substr(24, 33) === '' ?
      <li role="presentation" className="active">
        <NavLink to="/campuses"><h2>Campuses</h2></NavLink>
      </li> : <li role="presentation">
        <NavLink to="/campuses" ><h2>Campuses</h2></NavLink>
      </li>}
      {location.href.substr(24, 33) === 'students' ?
      <li role="presentation" className="active">
        <NavLink to="/students"><h2>Students</h2></NavLink>
      </li> : <li role="presentation">
        <NavLink to="/students"><h2>Students</h2></NavLink>
      </li>}
    </nav>
  );
};
export default Root;
