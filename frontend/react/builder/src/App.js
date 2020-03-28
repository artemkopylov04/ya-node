import React from 'react';
import Footer from './components/Footer/Footer';
import Start from './views/Start/Start';
import Settings from './views/Settings/Settings';
import Details from './views/Details/Details';
import History from './views/History/History';

function App() {
  return (
    <div className="page">
      {/* <Start /> */}
      {/* <Settings /> */}
      {/* <Details /> */}
      <History />
      <Footer />
    </div>
  );
}

export default App;
