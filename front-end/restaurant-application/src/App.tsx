import React from 'react';
import './App.css';
import ApplicationForm from './ApplicationForm';
import logo from './logo.svg';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <ApplicationForm />
        </div>
      </header>
    </div>
  );
};

export default App;
