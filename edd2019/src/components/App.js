import React, { Component } from 'react';
import AddCat from './AddCat';
import CatList from './CatList';
import CatCard from './CatCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Rodrigo's magic
          </p>
        </header>
        <main>
          <AddCat></AddCat>
          <CatList></CatList>
          <CatCard name="adsf"></CatCard>
        </main>
      </div>
    );
  }
}

export default App;
