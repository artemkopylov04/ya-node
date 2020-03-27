import React from 'react';
import Footer from './components/Footer/Footer';
import Start from './views/Start/Start';

function App() {
  return (
    <div className="layout_display_flex layout_direction_column layout_height_100">
    <Start />
    <Footer />
    </div>
  );
}

export default App;
