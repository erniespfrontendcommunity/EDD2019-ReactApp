import React, { Component } from 'react';

export default class CatCard extends Component {
  render() {
    return (
      <article>
        <h3>{this.props.name}</h3>
      </article>
    )
  }
}
