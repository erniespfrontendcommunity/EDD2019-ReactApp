import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Lore from './components/Lore';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddCat from './components/AddCat';
import CatSquad from './components/CatSquad';
import PlayLeague from './components/PlayLeague';
import Header from './components/Header'

ReactDOM.render (
<Router>
      <div>
        <Header/>
        <Route exact path="/" component={Lore} />
        <Route exact path="/createCat" component={AddCat} />
        <Route exact path="/catSquad" component={CatSquad} />
        <Route exact path="/playLeague" component={PlayLeague} />

      </div>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
