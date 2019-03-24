import React, { Component } from 'react';

export default class CatCard extends Component {
  render() {
    return (
      <article className="nes-container is-dark with-title">
        <h3 className="title">{this.props.name}</h3>
      </article>
    )
  }
}
