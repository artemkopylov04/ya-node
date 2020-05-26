import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { getSettings, setSettings } from './store/actions';

import Start from './views/Start/Start';
import Settings from './views/Settings/Settings';
import Details from './views/Details/Details';
import History from './views/History/History';

import Footer from './components/Footer/Footer';

function App() {
  const dispatch = useDispatch()

  const settingsSetted = useSelector(state => state.settingsSetted);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSettings())
      .then((res) => {
          const data = res.data.data.data;
          dispatch(setSettings({
              repoName: data.repoName,
              buildCommand: data.buildCommand,
              mainBranch: data.mainBranch,
              period: data.period,
          }));
          setIsLoaded(true);
      })
      .catch((e) => console.error(e));
  }, [dispatch]);

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
