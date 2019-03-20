import * as React from 'react';
import '../styles/App.css';
import AddCat from './AddCat';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-title">Paul's magic goes here</p>
        <br></br>
        <br></br>
        <AddCat></AddCat>
      </div>
    );
  }
}

export default App;
