import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/index.scss';
import Lore from './pages/Lore';
import AddCat from './pages/AddCat';
import CatSquad from './pages/CatSquad';
import PlayLeague from './pages/PlayLeague';
import Header from './components/Header'

ReactDOM.render (
<Router>
      <div>
        <Header/>
        <main>
          <Route exact path="/" component={Lore} />
          <Route exact path="/createCat" component={AddCat} />
          <Route exact path="/catSquad" component={CatSquad} />
          <Route exact path="/playLeague" component={PlayLeague} />
        </main>

      </div>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
