import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { getSettings } from './store/actions';

import Start from './views/Start/Start';
import Settings from './views/Settings/Settings';
import Details from './views/Details/Details';
import History from './views/History/History';

import Footer from './components/Footer/Footer';

import { State } from './store/state';

function App() {
  const dispatch = useDispatch()

  const settingsSetted = useSelector<State, boolean>(state => state.settingsSetted);
  const isLoaded = useSelector<State, boolean>(state => state.isLoaded);

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <div className="page">
      {isLoaded
        && <Fragment>
          <Router>
            <Switch>
              <Route path="/settings">
                <Settings/>
              </Route>
              <Route path="/build/:id">
                <Details/>
              </Route>
              <Route>
                {settingsSetted ? <History/> : <Start/>}
              </Route>
            </Switch>
          </Router>
          <Footer/>
        </Fragment>
      }
    </div>
  );
}

export default App;
