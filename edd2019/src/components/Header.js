import React from 'react';
import { Link } from 'react-router-dom';

import { routesMap } from '../routes.config'

export default function Header() {
  return (
    <ul className="navBar">
      {
        Object.keys(routesMap).map((routeKey, index) => {
          const route = routesMap[routeKey]
          return (
            <li key={index}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}