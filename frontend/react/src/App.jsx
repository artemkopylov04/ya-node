import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setSettings } from './store/actions';

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
    (async () => {
      try {
        const { data } = await axios.get('/api/settings');
        const resData = data.data.data;
        if (resData && resData.repoName
        && resData.buildCommand && resData.mainBranch && resData.period) {
          dispatch(setSettings({
            repoName: resData.repoName,
            buildCommand: resData.buildCommand,
            mainBranch: resData.mainBranch,
            period: resData.period,
          }))
        }
        setIsLoaded(true);
      } catch (e) {
        console.error(e)
      }
    })();
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
