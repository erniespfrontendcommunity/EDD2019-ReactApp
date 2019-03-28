import React, { Component } from 'react';
import oak from '../assets/images/oak.gif'

export default class CatCard extends Component {
  render() {
    return (
      <article className="nes-container is-dark with-title CatCard">
        <h3 className="title">Name: {this.props.name}</h3>
        <h3 className="CatCard__prop">Stealth: {this.props.stealth}</h3>
        <h3 className="CatCard__prop">Dexterity: {this.props.dexterity}</h3>
        <h3 className="CatCard__prop">Intelligence: {this.props.intelligence}</h3>
        <h3 className="CatCard__prop">Cuteness: {this.props.cuteness}</h3>
        <h3 className="CatCard__prop">Evilness: {this.props.evilness}</h3>
        <h3 className="CatCard__prop">Chaos Level: {this.props.chaosLevel}</h3>
        <img
          src={oak}
          className="CatCard__avatar"
          alt=""
        ></img>
      </article>
    )
  }
}
