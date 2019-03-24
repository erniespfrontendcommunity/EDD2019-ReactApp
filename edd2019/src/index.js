import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/index.scss';

import { routesMap } from './routes.config'

import Header from './components/Header'

ReactDOM.render (
<Router>
      <div>
        <Header/>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            {
              Object.keys(routesMap).map((routeKey, index) => {
                const route = routesMap[routeKey]
                return (
                  <Route key={index} exact path={route.path} component={route.component} />
                )
              })
            }
          </Suspense>
        </main>

      </div>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
