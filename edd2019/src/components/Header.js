import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <ul className="navBar">
      <li>
        <Link to="/">Lore</Link>
      </li>
      <li>
        <Link to="/createCat">Create Cat</Link>
      </li>
      <li>
        <Link to="/catSquad">Create Cat Squad</Link>
      </li>
      <li>
        <Link to="/playLeague">Play Cat League</Link>
      </li>
    </ul>
  )
}