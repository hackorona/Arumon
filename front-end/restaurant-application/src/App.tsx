import React from 'react';
import './App.css';
import ApplicationForm from './ApplicationForm';
import header from './assets/img/bento_header.jpg';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={header} className="App-logo" alt="logo" />
      </header>
      <div>
        <ApplicationForm />
      </div>
    </div>
  );
};

export default App;
