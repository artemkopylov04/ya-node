import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Start from './views/Start/Start';
import Settings from './views/Settings/Settings';
import Details from './views/Details/Details';
import History from './views/History/History';

import Footer from './components/Footer/Footer';

function App() {
  const [settings, setSettings] = useState({});
  const [settingsAreSet, setSettingsAreSet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios(
      '/api/settings',
    )
      .then(({ data }) => {
        const resData = data.data.data;
        if (resData && resData.repoName
        && resData.buildCommand && resData.mainBranch && resData.period) {
          setSettings({
            repoName: resData.repoName,
            buildCommand: resData.buildCommand,
            mainBranch: resData.mainBranch,
            period: resData.period,
          });
          setSettingsAreSet(true);
        } else {
          setSettings({
            repoName: '',
            buildCommand: '',
            mainBranch: '',
            period: '',
          });
        }
        setIsLoaded(true);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="page">
      {isLoaded
        && (
        <Router>
          <Switch>
            <Route path="/settings">
              <Settings
                settings={settings}
                setSettings={setSettings}
                setSettingsAreSet={setSettingsAreSet}
              />
              <Footer />
            </Route>
            <Route path="/build/:id">
              <Details settings={settings} />
              <Footer />
            </Route>
            <Route>
              {settingsAreSet ? <History settings={settings} /> : <Start />}
              <Footer />
            </Route>
          </Switch>
        </Router>
        )}
    </div>
  );
}

export default App;
