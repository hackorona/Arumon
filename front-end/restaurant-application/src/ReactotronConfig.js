import Reactotron from 'reactotron-react-js';

Reactotron.configure() // we can use plugins here -- more on this later
  .connect(); // let's connect!

console.tron = Reactotron;
console.log = Reactotron.log;
console.tron.log('Welcome to Reactotron');
