import * as React from 'react';
import gif from '../images/mgc.gif';
import '../styles/App.css';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-title">Paul's magic goes here</p>
        <img src={gif} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default App;
