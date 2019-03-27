import React, { Component } from 'react';
import oak from '../assets/images/oak.gif'
import pixelCat from '../assets/images/pixelcat.png';

class Lore extends Component {
  render() {
    return (
      <section className="Lore">
        <div className="nes-container with-title">
          <p className="title titleContainer">NEW GAME</p>
          <div className="lore-container">
            <div className="text-into nes-container is-rounded">
              <div className="nes-balloon from-right">
                <p>Hello there!</p>
                <p>Welcome to the world of Blockchain Cats. My name is OAK.</p>
                <p>People affectionately refer to me as the Blockchain Professor.</p>
                <p>This world... is inhabited far and wide by creatures called Blockchain Cats.</p>
                <p>For some people, Blockchain Cats are pets. Other use them for battling.</p>
                <p>As for myself...</p>
                <p>I stufy Blockchain Cats as a profession.</p>
                <p>Your very own Blockchain legend is about to unfold!</p>
                <p>A world of dreams and adventures with Blockchain Cats awaits!</p>
                <p>Let's go!</p>
              </div>
              <div className="image-cat">
                <img src={pixelCat} alt="pixelCat" />
              </div>

              <span>In order to complete your Blockchain adventure you need to implement two functionalities:</span>
              <ol>
                <li>Implement a function that creates a cat into the blockchain based on the form on the <code>Create Cat tab</code>:
                    <ul>
                      <li>Your function should take into account the values on the form on send them to the Blockchain.</li>
                      <li>To start, go to <code>src/pages/AddCat.js</code> fulfill the function called <code>addCat</code>.</li> 
                    </ul>
                </li>
                <li>Implement a function that gets all our precious cats from the Blockchain:
                    <ul>
                        <li>To start, go to <code>src/pages/CatSquad.js</code> fulfill the function called <code>getCatList</code>.</li>
                    </ul>
                </li>
              </ol>
            </div>
            <div className="image-oak">
              <img src={oak} alt="oak" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Lore;
