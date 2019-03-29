import React, { Component } from 'react';

import CatAvatar from './CatAvatar.js'

export default class CatCard extends Component {
  render() {
    const cat = {...this.props}
    return (
      <article className="nes-container is-dark with-title CatCard">
        <h3 className="title">Name: {cat.catName}</h3>
        <CatAvatar
          color="#82368C"
          catName={cat.name}
          stealth={cat.stealth}
          dexterity={cat.dexterity}
          intelligence={cat.intelligence}
          cuteness={cat.cuteness}
          evilness={cat.evilness}
          chaosLevel={cat.chaosLevel}
        ></CatAvatar>
        <h3 className="CatCard__prop">Stealth: {cat.stealth}</h3>
        <h3 className="CatCard__prop">Dexterity: {cat.dexterity}</h3>
        <h3 className="CatCard__prop">Intelligence: {cat.intelligence}</h3>
        <h3 className="CatCard__prop">Cuteness: {cat.cuteness}</h3>
        <h3 className="CatCard__prop">Evilness: {cat.evilness}</h3>
        <h3 className="CatCard__prop">Chaos Level: {cat.chaosLevel}</h3>
      </article>
    )
  }
}
