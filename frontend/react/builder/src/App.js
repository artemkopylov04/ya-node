import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Start from './views/Start/Start';
import Settings from './views/Settings/Settings';
import Details from './views/Details/Details';
import History from './views/History/History';

import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="page">
      <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route>
            <Start />
          </Route>
        </Switch>
      </Router>
      
      <Footer />
    </div>
  );
}

export default App;
