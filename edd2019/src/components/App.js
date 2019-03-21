import React, { Component } from 'react';
import '../styles/App.css';
import AddCat from './AddCat';
import CatList from './CatList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Paul's magic
          </p>
          <AddCat></AddCat>
          <CatList></CatList>
        </header>
      </div>
    );
  }
}

export default App;
