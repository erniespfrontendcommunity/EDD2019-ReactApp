import React, { Component } from 'react';
import CatList from '../components/CatList';


class CatSquad extends Component {
  render() {
    return (
      <div>
        <section className="CatSquad">
          <CatList></CatList>
        </section>
      </div>
    );
  }
}

export default CatSquad;