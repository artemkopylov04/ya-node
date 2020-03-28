import React from 'react';
import Footer from './components/Footer/Footer';
import Start from './views/Start/Start';
import Settings from './views/Settings/Settings';

function App() {
  return (
    <div className="page">
      <Start />
      {/* <Settings /> */}
      <Footer />
    </div>
  );
}

export default App;
