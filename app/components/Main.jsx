import React from 'react';
import { HashRouter as Router, Route, Switch, Link  } from 'react-router-dom';
import Home from './Home';
import Campuses from './Campuses';
import Students from  './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Root from './Root';
import StudentUpdate from './StudentUpdate';
import NotFound from './NotFound';

const Main = () => {
    return (
       <Router>
        <div id="main">
          <Root />
          <div >
            <Switch>
              <Route exact path="/campuses" component={Campuses} />
              <Route exact path="/students" component={Students} />
              <Route path="/campuses/:campusId" component={SingleCampus} />
              <Route path="/students/:studentId" component={SingleStudent} />
              <Route exact path="/" component={Campuses} />
            </Switch>
          </div>
        </div>
    </Router>
    );
  };
export default Main;
