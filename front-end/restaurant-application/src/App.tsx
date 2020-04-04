import React, { useState } from 'react';
import AcceptApplication from './AcceptApplication';
import './App.css';
import ApplicationForm from './ApplicationForm';
import header from './assets/img/bento_header.jpg';

const App: React.FunctionComponent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={header} className="App-logo" alt="logo" />
      </header>
      <div>
        {isSubmitted ? (
          <AcceptApplication />
        ) : (
          <ApplicationForm onSuccess={() => setIsSubmitted(true)} />
        )}
      </div>
    </div>
  );
};

export default App;
