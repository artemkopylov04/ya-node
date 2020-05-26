import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IntlProvider } from "react-intl";

import './App.scss';
import { getSettings } from './store/actions';

import Start from './views/Start/Start';
import Settings from './views/Settings/Settings';
import Details from './views/Details/Details';
import History from './views/History/History';

import Footer from './components/Footer/Footer';

import { State } from './store/state';

import messages_en from "./locales/en.json";
import messages_ru from "./locales/ru.json";

const messages: any = {
  en: messages_en,  
  ru: messages_ru,
};

function App() {
  const dispatch = useDispatch();
  
  const settingsSetted = useSelector<State, boolean>(state => state.settingsSetted);
  const isLoaded = useSelector<State, boolean>(state => state.isLoaded);
  
  let lang = useSelector<State, string>(state => state.lang);

  if (lang === 'none') {
    lang = navigator.language.split(/[-_]/)[0];
    if (lang !== 'ru') {
      lang = 'en'
    }

    localStorage.setItem('lang', lang);
  }

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  return (
    <div className="page">
      <IntlProvider key={lang} locale={lang} messages={messages[lang]}>
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
      </IntlProvider>
    </div>
  );
}

export default App;
