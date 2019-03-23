import React, { Component } from 'react';
import CatList from './CatList';
import CatCard from './CatCard';


class CatSquad extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <CatList></CatList>
          <CatCard name="adsf"></CatCard>
        </main>
      </div>
    );
  }
}

export default CatSquad;